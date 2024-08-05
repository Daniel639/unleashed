const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./users');
const Pet = require('./pets');
const Playdate = require('./playdates');
const Post = require('./posts');
const Comment = require('./comments');
const PetPlaydate = require('./petPlaydate');

// Define associations
User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Pet.belongsToMany(Playdate, {
  through: PetPlaydate,
  foreignKey: 'pet_id',
  otherKey: 'playdate_id',
  as: 'petPlaydates'
});

Playdate.belongsToMany(Pet, {
  through: PetPlaydate,
  foreignKey: 'playdate_id',
  otherKey: 'pet_id',
  as: 'playdatePets'
});

// Function to sync all models
const syncModels = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('Running in production mode. Skipping model sync. Ensure migrations are run.');
      return;
    }

    console.log('Starting model synchronization...');
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    // Log the current structure of the pets table
    const [results] = await sequelize.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'pets';
    `);
    console.log('Current structure of pets table:', results);
    
  } catch (error) {
    console.error('An error occurred while synchronizing the models:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

// Function to test database connection
const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = { 
  sequelize,
  User, 
  Pet, 
  Playdate, 
  Post, 
  Comment, 
  PetPlaydate,
  syncModels,
  testDatabaseConnection
};