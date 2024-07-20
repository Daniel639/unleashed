const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for books
class Comment extends Model {}

Comment.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    pet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pets',
        key: 'id',
      },
    },
    content: {
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
    modelName: 'comments'
  }
);

module.exports = Comment;