const mysql = require('mysql');

const makeConnection = env => mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: env,
});

const devEnv = 'recommendations';
const testEnv = 'test';

const devDB = makeConnection(devEnv);
const testDB = makeConnection(testEnv);

devDB.connect((err) => {
  if (err) {
    console.log(`connecting to database devDB error: ${err}`);
  } else {
    console.log('connected to database devDB');
  }
});

testDB.connect((err) => {
  if (err) {
    console.log(`connecting to database testDB error: ${err}`);
  } else {
    console.log('connected to database testDB');
  }
});

module.exports = {
  devDB,
  testDB,
};
