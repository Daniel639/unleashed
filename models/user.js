const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
// Create a new Sequelize model for users
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        // prevents null values
        allowNull: false,
        // will only allow alphanumeric characters
        validate: {
          isAlphanumeric: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // must be longer than 8 characters
        validate: {
          len: [8,16],
        },
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.email = await newUserData.email.toLowerCase();
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (newUserData) => {
        if (updatedUserData._changed.has("email")) {
        newUserData.email = await newUserData.email.toLowerCase();
        if (updatedUserData._changed.has("password")) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return newUserData;
      }
    }
    }
  },
   // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    freezeTableName: true,
    //When true , this option will set the field option on all attributes to the snake_case version of its name
    underscored: true,
    modelName: 'users'
   }
);

module.exports = User;