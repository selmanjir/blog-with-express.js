const User = require('./user');
const Post = require('./post');
const Category = require('./category');
const PostCategory = require('./post_category');

const associations = () => {
    Post.belongsTo(User, { foreignKey: 'author_id',});
    User.hasMany(Post, { name: 'posts',foreignKey: 'id'});
    Category.belongsToMany(Post, { through: PostCategory, foreignKey: 'category_id' });
    Post.belongsToMany(Category, { through: PostCategory, foreignKey: 'post_id' });
}

module.exports = associations;