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
const db = require('../db-mysql/db.js');
const { demoNames, demoText, demoCategories } = require('../sample/ipsum.js');

const demoNamesMax = demoNames.length;
const playMax = 10001;
const imageMin = 1; // due to S3 file pathname
const imageMax = 101;
const demoTextMax = demoText.length;
const titleMin = 15;
const titleMax = 36;
const categoryMin = 1; // due to sql table id starts at 1
const categoryMax = demoCategories.length;

const makeRandomIndex = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const makeVideoDetails = () => {
  const startIndex = makeRandomIndex(demoTextMax);
  return [
    // author
    demoNames[makeRandomIndex(demoNamesMax)],
    // plays
    makeRandomIndex(playMax),
    // thumbnailIndex
    makeRandomIndex(imageMax, imageMin),
    // title
    demoText.slice(startIndex, startIndex + makeRandomIndex(titleMax, titleMin)).trim(),
    // category_id
    makeRandomIndex(categoryMax, categoryMin),
  ];
};

// const totalCount = 10000000;
const totalCount = 100000;
const singleBatch = 5000;
const batchVideos = [];
let batchCount = 0;

const insertVideoAsync = videoDetail => new Promise((resolve, reject) => {
  const sql = 'INSERT INTO video (author, plays, thumbnailIndex, title, category_id) VALUES (?, ?, ?, ?, ?)';
  const sqlArgs = videoDetail;
  db.query(sql, sqlArgs, (err) => {
    if (err) {
      console.log(`insert into video table error: ${err}`);
      reject(err);
    } else {
      resolve();
    }
  });
});

let start;
let end;

const insertBatchAsync = () => {
  if (batchCount === 0) {
    start = new Date();
  }

  for (let i = 0; i < singleBatch; i += 1) {
    batchVideos.push(makeVideoDetails());
  }
  return Promise.all(batchVideos.map(videoDetail => insertVideoAsync(videoDetail)))
    .then(() => {
      while (batchVideos.length > 0) {
        batchVideos.pop();
      }
    })
    .then(() => {
      batchCount += 1;
      console.log(`seeded ${batchCount * singleBatch / 1000}k entries`);
    })
    .then(() => {
      if (batchCount === totalCount / singleBatch) {
        end = new Date();
        console.log(`total seeding process took ${((end - start) / 1000 / 60).toFixed(1)} minutes`);
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
