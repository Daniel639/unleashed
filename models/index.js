const User = require('./user');
const Pet = require('./pet');
const Comment = require('./comment');
const Post = require('./post');

User.hasMany(Pet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
    foreignKey: 'user_id'
});

Pet.hasMany(Comment, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Pet, {
    foreignKey: 'pet_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {User, Pet, Comment};
