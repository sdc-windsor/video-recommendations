const { demoCategories } = require('../sample/ipsum.js');

const env = 'recommendations';
const db = require('../db-mysql/db.js')(env);

db.connect((err) => {
  if (err) {
    console.log(`connecting to database ${env} error: ${err}`);
  } else {
    console.log(`connected to database ${env}`);
  }
});

const insertCategory = (connection, categoryName) => {
  const sql = 'INSERT INTO category (name) VALUES (?)';
  const sqlArgs = [categoryName];
  connection.query(sql, sqlArgs, (err) => {
    if (err) {
      console.log(`insert into category table error: ${err}`);
    } else {
      console.log('inserted an entry into category table');
    }
  });
};

demoCategories.forEach((name) => {
  insertCategory(db, name);
});

db.end((err) => {
  if (err) {
    console.log(`error ending connection to db: ${err}`);
  } else {
    console.log('connection to db ended');
  }
});

// 11 unique categories
