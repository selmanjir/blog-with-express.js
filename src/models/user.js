'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');
 
  class User extends Model {}
  User.init({
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user'
  });


module.exports = User;
