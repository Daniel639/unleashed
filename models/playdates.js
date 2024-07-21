const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playdates extends Model {}

Playdates.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
    type: DataTypes.DATE,
    allowNull: false,
    },
    time: {
        type: DataTypes.time,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: 'playdates'
  }
);

module.exports = Playdates;