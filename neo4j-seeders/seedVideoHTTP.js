// Using Neo4j HTTP API
const Promise = require('bluebird');
const cypherMultiAsync = Promise.promisify(require('../db-neo4j/db.js'));
const { makeCreateMultiQuery } = require('../utils/genNeo4jQuery.js');
const { makeNeo4jVideoDetails } = require('../utils/genVideo.js');

// Video { author: 'kjenner', plays: 10000, thumbnailIndex: 2, title: 'spring 19' }
const totalCount = 40000;
const queriesPerSingleBatch = 1000;
const nodesPerQuery = 1;

const singleBatch = [];
let batchCount = 0;
let start;
let end;

// const nodeVar = 'v';
const nodeLabel = 'Video';

const insertBatchAsync = () => {
  if (batchCount === 0) {
    start = new Date();
  }

  for (let i = 0; i < queriesPerSingleBatch; i += 1) {
    const dataArray = [];
    for (let j = 0; j < nodesPerQuery; j += 1) {
      dataArray.push(makeNeo4jVideoDetails());
    }
    const singleQuery = makeCreateMultiQuery(dataArray, nodeLabel);
    singleBatch.push(singleQuery);
  }

  cypherMultiAsync(singleBatch)
    .then(() => {
      while (singleBatch.length > 0) {
        singleBatch.pop();
      }
    })
    .then(() => {
      batchCount += 1;
      console.log(new Date() - start);
      console.log(`seeded ${batchCount}k nodes`);
    })
    .then(() => {
      if (batchCount >= totalCount / queriesPerSingleBatch / nodesPerQuery) {
        end = new Date();
        console.log(`total seeding process took ${((end - start) / 1000).toFixed(1)} seconds`);
        process.exit();
      } else {
        insertBatchAsync();
      }
    });
};

insertBatchAsync();
