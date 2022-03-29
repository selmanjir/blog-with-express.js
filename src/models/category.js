'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class Category extends Model {}
  Category.init({
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'category'
  });


module.exports = Category;
