'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed Users
    const users = await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password: 'hashedpassword123', // In a real app, use bcrypt to hash passwords
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        password: 'hashedpassword456',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Seed Pets
    const pets = await queryInterface.bulkInsert('Pets', [
      {
        userId: users[0].id,
        name: 'Buddy',
        type: 'Dog',
        breed: 'Labrador',
        age: '3',
        gender: 'Male',
        bio: 'Friendly and energetic Labrador who loves to play fetch.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1].id,
        name: 'Whiskers',
        type: 'Cat',
        breed: 'Siamese',
        age: '5',
        gender: 'Female',
        bio: 'Elegant Siamese cat who enjoys lounging in sunny spots.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Seed Posts
    const posts = await queryInterface.bulkInsert('Posts', [
      {
        petId: pets[0].id,
        title: 'Buddy\'s Park Adventure',
        content: 'Had a great time at the dog park today! Made new friends and played fetch for hours.',
        date: '2024-03-15',
        time: '14:30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        petId: pets[1].id,
        title: 'Whiskers\' Lazy Sunday',
        content: 'Spent the whole day napping in my favorite sunbeam. Purrfect!',
        date: '2024-03-16',
        time: '10:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Seed Comments
    await queryInterface.bulkInsert('Comments', [
      {
        postId: posts[0].id,
        userId: users[1].id,
        content: 'Looks like Buddy had a blast! We should arrange a playdate.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: posts[1].id,
        userId: users[0].id,
        content: 'Whiskers knows how to enjoy life! My Buddy could learn a thing or two about relaxation.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seeded data
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Pets', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};