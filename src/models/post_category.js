'use strict';
const { Model, DataTypes, NUMBER } = require('sequelize');

const sequelize = require('../config/db');

class Post_category extends Model {}
Post_category.init({
  postId : {
    type : NUMBER,
    references : {
      model : 'posts',
      key : 'id'
    }
  },
  categoryId : {
    type : NUMBER,
    references : {
      model : 'categories',
      key : 'id'
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'post_category'
});

module.exports = Post_category;
