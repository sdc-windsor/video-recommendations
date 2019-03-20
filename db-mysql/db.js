const mysql = require('mysql');

const makeConnection = env => mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: env,
});

module.exports = makeConnection;
