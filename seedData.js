const { User, Pet } = require('./models');
const sequelize = require('./config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); //  this will drop all tables

  // Create sample users
  const users = await User.bulkCreate([
    {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123', // ensure passwords are hashed
    },
    {
      username: 'janedoe',
      email: 'jane@example.com',
      password: 'password456',
    },
  ], {
    individualHooks: true, // This will ensure that the password hashing hook is run
  });

  // Create sample pets
  const pets = await Pet.bulkCreate([
    {
      name: 'Buddy',
      type: 'Dog',
      breed: 'Labrador',
      age: 5,
      gender: 'Male',
      bio: 'Friendly and energetic Labrador who loves to play fetch.',
      user_id: users[0].id,
      url: '/1.jpg', // Using one of the existing images
    },
    {
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Siamese',
      age: 3,
      gender: 'Female',
      bio: 'Elegant Siamese cat who enjoys sunbathing and bird watching.',
      user_id: users[0].id,
      url: '/2.jpg', // Using one of the existing images
    },
    {
      name: 'Rex',
      type: 'Dog',
      breed: 'German Shepherd',
      age: 4,
      gender: 'Male',
      bio: 'Loyal and protective German Shepherd, great with kids.',
      user_id: users[1].id,
      url: '/3.jpg', // Using one of the existing images
    },
  ]);

  console.log('Sample data has been added to the database.');
};

seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });