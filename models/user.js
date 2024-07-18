const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for books
class User extends Model {}

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
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    //When true , this option will set the field option on all attributes to the snake_case version of its name
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;