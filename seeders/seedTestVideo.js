// author VARCHAR(80),
// plays INTEGER,
// thumbnail VARCHAR(255),
// title VARCHAR(80) UNIQUE,
// category_id INTEGER REFERENCES category(id)

// author: 'Mr. Amani Senger',
// plays: 63438,
// thumbnail: 'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images/10.jpg',
// title: 'autem quod est',
// category_id: 1,

const Promise = require('bluebird');
const { makeVideoDetails } = require('../utils/genVideo.js');

const db = require('../db-mysql/db.js').testDB;

const totalCount = 400;
const queriesPerSingleBatch = 2;
const singleBatch = [];
const rowsPerQuery = 10;
let batchCount = 0;
let start;
let end;

const makeQueryArgs = () => {
  const array = [];
  for (let i = 0; i < rowsPerQuery; i += 1) {
    makeVideoDetails().forEach((detail) => {
      array.push(detail);
    });
  }
  return array;
};

const makeQueryString = (rowCounts) => {
  let string = 'INSERT INTO video (author, plays, thumbnailIndex, title, category_id) VALUES ';
  const rowString = '(?, ?, ?, ?, ?),';
  const rowStringEnd = '(?, ?, ?, ?, ?)';
  for (let i = 0; i < rowCounts; i += 1) {
    if (i === rowsPerQuery - 1) {
      string += rowStringEnd;
    } else {
      string += rowString;
    }
  }
  return string;
};

const insertVideoAsync = (rows, queryArgs) => new Promise((resolve, reject) => {
  const sql = makeQueryString(rows);
  const sqlArgs = queryArgs;
  db.query(sql, sqlArgs, (err) => {
    if (err) {
      console.log(sqlArgs);
      console.log(`insert into video table error: ${err}`);
      reject(err);
    } else {
      resolve();
    }
  });
});

const insertBatchAsync = () => {
  if (batchCount === 0) {
    start = new Date();
  }

  for (let i = 0; i < queriesPerSingleBatch; i += 1) {
    singleBatch.push(makeQueryArgs());
  }
  return Promise.all(singleBatch.map(queryArgs => insertVideoAsync(rowsPerQuery, queryArgs)))
    .then(() => {
      while (singleBatch.length > 0) {
        singleBatch.pop();
      }
    })
    .then(() => {
      batchCount += 1;
      console.log(`seeded ${batchCount} million entries`);
    })
    .then(() => {
      if (batchCount === totalCount / queriesPerSingleBatch / rowsPerQuery) {
        end = new Date();
        console.log(`total seeding process took ${((end - start) / 1000).toFixed(1)} seconds`);
        process.exit();
      } else {
        insertBatchAsync();
      }
    });
};

insertBatchAsync();

// db.end((err) => {
//   if (err) {
//     console.log(`error ending connection to db: ${err}`);
//   } else {
//     console.log('connection to db ended');
//   }
// });
