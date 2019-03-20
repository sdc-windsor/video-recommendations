const mysql = require('mysql');

const database = 'test';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database,
});

connection.connect();

// connection.query('select * from category', (err, res) => {
//   if (err) {
//     console.log(`error getting results from category table: ${err}`);
//   } else {
//     console.log(`results from category table: ${res}`);
//   }
// });

// connection.end((err) => {
//   if (err) {
//     console.log(`error ending connection to db: ${err}`);
//   } else {
//     console.log('connection to db ended');
//   }
// });

module.exports = connection;
