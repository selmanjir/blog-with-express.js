const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = require('../db')

class User extends Model {}
User.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  full_name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING
}, { sequelize, modelName: 'user' })

module.exports = User

