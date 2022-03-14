const db_configs = require('./config/config.json')
const Sequelize = require('sequelize')

const connection = new Sequelize(
    db_configs.development.database,
    db_configs.development.username,
    db_configs.development.password,
    {
      host: db_configs.development.host,
      dialect: db_configs.development.dialect,
      port : 3306,
    }
  )

module.exports = connection