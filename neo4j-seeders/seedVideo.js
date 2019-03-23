const { cypherMulti } = require('../db-neo4j/db.js');
const {
  makeConstraintArray,
  makeQueryArray,
  makeCb,
} = require('../utils/genNeo4jQuery');
const { makeNeo4jVideoDetails } = require('../utils/genVideo.js');

// Video { author: 'kjenner', plays: 10000, thumbnailIndex: 2, title: 'spring 19' }
const nodesPerBatch = 10;
const dataArray = [];

for (let i = 0; i < nodesPerBatch; i += 1) {
  dataArray.push(makeNeo4jVideoDetails());
}

const nodeVar = 'v';
const nodeLabel = 'Video';
const nodeProp = null;

// const constraintArray = makeConstraintArray(nodeVar, nodeLabel, nodeProp);

const queryArray = makeQueryArray(dataArray, nodeVar, nodeLabel, nodeProp);

const cb = makeCb(nodeLabel);

// cypherMulti(constraintArray, cb);
cypherMulti(queryArray, cb);
