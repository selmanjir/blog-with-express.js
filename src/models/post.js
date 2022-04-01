'use strict';
const { Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = require('../config/db');

  class Post extends Model {}
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    post_face : DataTypes.STRING,
    authorId : {
      type : INTEGER,
      references : {
        model : 'users',
        key : 'id'
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'post'
  });


module.exports = Post;
