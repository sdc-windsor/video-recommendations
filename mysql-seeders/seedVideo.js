// author: 'Mr. Amani Senger',
// plays: 63438,
// thumbnail: 'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images/10.jpg',
// title: 'autem quod est',
// category_id: 1,

// +---------+--------+-------+----------------+------------------------+-------------+
// | id      | author | plays | thumbnailIndex | title                  | category_id |
// +---------+--------+-------+----------------+------------------------+-------------+
// | 3726979 | Munoz  |  3373 |  11            | austin banh mi cred m  |  3          |
// +---------+--------+-------+----------------+------------------------+-------------+

const Promise = require('bluebird');
const { makeSQLVideoDetails } = require('../utils/genVideo.js');

const db = require('../db-mysql/db.js').devDB;

const totalCount = 10000000;
const queriesPerSingleBatch = 2000;
const singleBatch = [];
const rowsPerQuery = 500;
let batchCount = 0;
let start;
let end;

const makeQueryArgs = () => {
  const array = [];
  for (let i = 0; i < rowsPerQuery; i += 1) {
    makeSQLVideoDetails().forEach((detail) => {
      array.push(detail);
    });
  }
  return array;
};

const makeQueryString = (queryArgsLength) => {
  let string = 'INSERT INTO video (author, plays, thumbnailIndex, title, category_id) VALUES ';
  const rowString = '(?, ?, ?, ?, ?),';
  const rowStringEnd = '(?, ?, ?, ?, ?)';
  for (let i = 0; i < queryArgsLength / 5; i += 1) {
    if (i === (queryArgsLength / 5) - 1) {
      string += rowStringEnd;
    } else {
      string += rowString;
    }
  }
  return string;
};

const insertVideoAsync = queryArgs => new Promise((resolve, reject) => {
  const sql = makeQueryString(queryArgs.length);
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
  return Promise.all(singleBatch.map(queryArgs => insertVideoAsync(queryArgs)))
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
