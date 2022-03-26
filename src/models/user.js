'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class User extends Model {}
  User.init({
    username: DataTypes.STRING,
    full_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    email_active : DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user'
  });


module.exports = User;
