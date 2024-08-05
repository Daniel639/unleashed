const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for books
class Pet extends Model {}

Pet.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    breed: {
      type: DataTypes.STRING
    },
    // Will become `is_paperback` in table due to `underscored` flag
    age: {
      type: DataTypes.INTEGER,
      allowNull:true 
    },
    gender: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING
      }
  },
  {
    // Link to database connection
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: 'pets'
  }
);

module.exports = Pet;