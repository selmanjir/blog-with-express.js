const dbConfigs = require('./config/config.json')
const Sequelize = require('sequelize')

const db_connection = new Sequelize(
    dbConfigs.development.database,
    dbConfigs.development.username,
    dbConfigs.development.password,
    {
      host: dbConfigs.development.host,
      dialect: dbConfigs.development.dialect,
      port : 3306,
    }
  )

module.exports = {
  db_connection
};