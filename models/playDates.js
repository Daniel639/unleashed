
const { DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
// Importing the Pet model to establish associations
const Pet = require('./pet');

/* Define the PlayDate model with two fields: date and location*/
const PlayDate = sequelize.define('PlayDate', {
    /*'date' field to store the date and time of the play date*/
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    /* field to store the location of the play date*/
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

/* Establishes a many-to-one relationship between PlayDate and Pet
This means each PlayDate entry will be associated with one Pet entry as 'pet1'*/
PlayDate.belongsTo(Pet, { as: 'pet1', foreignKey: 'pet1Id' });

/* Establishes a many-to-one relationship between PlayDate and Pet
This means each PlayDate entry will be associated with one Pet entry as 'pet2'*/
PlayDate.belongsTo(Pet, { as: 'pet2', foreignKey: 'pet2Id' });

// Exporting the PlayDate model to be used in other parts of the application
module.exports = PlayDate;
