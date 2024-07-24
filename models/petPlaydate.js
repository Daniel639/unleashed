const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PetPlaydate extends Model {}

PetPlaydate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pet',
        key: 'id',
      },
    },
    playdate_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'playdate',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pet_playdate',
  }
);

module.exports = PetPlaydate;