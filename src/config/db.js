const db_configs = require('./config.json')
const Sequelize = require('sequelize')


const connection = new Sequelize(
    db_configs.development.database,
    db_configs.development.username,
    db_configs.development.password,
    {
      host: db_configs.development.host,
      dialect: db_configs.development.dialect,
      port : process.env.MYSQL_CONNECTION_STRING,
    }
  )
  
if(connection.authenticate())
console.log('veri tabanına bağlandı');
module.exports = connection