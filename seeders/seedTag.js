const { demoTags } = require('../sample/ipsum.js');

const env = 'recommendations';
const db = require('../db-mysql/db.js')(env);

db.connect((err) => {
  if (err) {
    console.log(`connecting to database ${env} error: ${err}`);
  } else {
    console.log(`connected to database ${env}`);
  }
});


const insertTag = (connection, tagName) => {
  const sql = 'INSERT INTO tag (word) VALUES (?)';
  const sqlArgs = [tagName];
  connection.query(sql, sqlArgs, (err) => {
    if (err) {
      console.log(`insert into tag table error: ${err}`);
    } else {
      console.log('inserted an entry into tag table');
    }
  });
};

demoTags.forEach((tag) => {
  insertTag(db, tag);
});

db.end((err) => {
  if (err) {
    console.log(`error ending connection to db: ${err}`);
  } else {
    console.log('connection to db ended');
  }
});

// 235 unique tags
