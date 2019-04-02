// +----+-------+----------+
// |id  |tag_id | video_id |
// +----+-------+----------+
// |2   |101    | 234928   |
// +----+-------+----------+
const Promise = require('bluebird');
const { makeVideoTag } = require('../utils/genVideoTag.js');

const db = require('../db-mysql/db.js').devDB;

const totalCount = 10000000;
const queriesPerSingleBatch = 2000;
const videoIdsPerQuery = 500;
// const totalCount = 100;
// const queriesPerSingleBatch = 2;
// const videoIdsPerQuery = 5;

const singleBatch = [];
let batchCount = 0;
let videoIdCount = 1;

let start;
let end;

const makeQueryArgs = () => {
  const array = [];

  for (let i = 0; i < videoIdsPerQuery; i += 1) {
    makeVideoTag(videoIdCount).forEach((value) => {
      array.push(value);
    });
    videoIdCount += 1;
  }
  return array;
};

const makeQueryString = (queryArgsLength) => {
  let string = 'INSERT INTO video_tag (tag_id, video_id) VALUES ';
  const rowString = '(?, ?),';
  const rowStringEnd = '(?, ?)';
  for (let i = 0; i < queryArgsLength / 2; i += 1) {
    if (i === (queryArgsLength / 2) - 1) {
      string += rowStringEnd;
    } else {
      string += rowString;
    }
  }
  return string;
};

const insertVideoTagAsync = queryArgs => new Promise((resolve, reject) => {
  const sql = makeQueryString(queryArgs.length);
  const sqlArgs = queryArgs;
  db.query(sql, sqlArgs, (err) => {
    if (err) {
      console.log(sqlArgs);
      console.log(`insert into video_tag table error: ${err}`);
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
  return Promise.all(singleBatch.map(queryArgs => insertVideoTagAsync(queryArgs)))
    .then(() => {
      while (singleBatch.length > 0) {
        singleBatch.pop();
      }
    })
    .then(() => {
      batchCount += 1;
      console.log(`seeded tags for ${batchCount} million videos`);
    })
    .then(() => {
      if (batchCount === totalCount / queriesPerSingleBatch / videoIdsPerQuery) {
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
