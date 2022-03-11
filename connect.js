const mysql2 = require('mysql2');


const connection = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'null',
    database: 'blog'
});
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });