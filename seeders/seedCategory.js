const db = require('../db-mysql/db.js');

const category = [
  'animation',
  'comedy',
  'music',
  'education',
  'art',
  'design',
  'documentary',
  'food',
  'fashion',
  'travel',
  'journalism',
];

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

category.forEach((name) => {
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
