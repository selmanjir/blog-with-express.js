'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class Category extends Model {}
  Category.init({
    title: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'category'
  });


module.exports = Category;
