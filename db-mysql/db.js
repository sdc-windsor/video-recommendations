const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'recommendations',
});

connection.connect();

connection.query('select * from category', (err, res) => {
  if (err) {
    console.log(`error getting results from category table: ${err}`);
  } else {
    console.log(`results from category table: ${res}`);
  }
});

module.exports = connection;
