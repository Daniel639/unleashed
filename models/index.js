const User = require('./users');
const Pet = require('./pets');
const Post = require('./posts');
const Comment = require('./commentss');

User.hasMany(Pet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
    foreignKey: 'user_id'
});

Pet.hasMany(Post, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(Pet, {
    foreignKey: 'pet_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Pet.hasMany(Comment, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Pet, {
    foreignKey: 'pet_id'
});

module.exports = {User, Pet, Post, Comment};
