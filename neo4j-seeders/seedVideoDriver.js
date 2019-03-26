// Using Neo4j Driver

// this script CREATEs
// 1) Video node
// 2) Video BELONGS_TO Category relationship
const Promise = require('bluebird');
const { session } = require('../db-neo4j/db.js');
const { makeCreateMultiString } = require('../utils/genNeo4jQuery.js');
const { makeNeo4jVideoDetails } = require('../utils/genVideo.js');

// (:Video { author: 'kjenner', plays: 10000, thumbnailIndex: 2, title: 'spring 19' })
// -[:BELONGS_TO]->(:Category {name: 'fashion'})
const totalCount = 10000000;
const queriesPerSingleBatch = 500;
const nodesPerQuery = 800;
const singleBatch = [];
let count = 0;

const nodeLabel = 'Video';

const sessionStart = new Date();

const createAsync = () => {
  // 800
  const dataArray = [];
  for (let j = 0; j < nodesPerQuery; j += 1) {
    dataArray.push(makeNeo4jVideoDetails());
  }
  // 'CREATE (:Video {...}), (:Video {...}), ...'
  for (let i = 0; i < queriesPerSingleBatch; i += 1) {
    const singleQuery = makeCreateMultiString(dataArray, nodeLabel);
    singleBatch.push(singleQuery);
  }

  return Promise.all(singleBatch.map(singleQuery => session.run(singleQuery)))
    .then(() => {
      while (singleBatch.length > 0) {
        singleBatch.pop();
      }
    })
    .then(() => {
      count += 1;
      console.log(count);
    })
    .then(() => {
      if (count >= totalCount / queriesPerSingleBatch / nodesPerQuery) {
        console.log(`seeding process took ${new Date() - sessionStart}`);
        process.exit();
      } else {
        createAsync();
      }
    });
};

createAsync();
