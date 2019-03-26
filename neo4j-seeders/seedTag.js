// Using Neo4j HTTP API

const { cypherMulti } = require('../db-neo4j/db.js');
const {
  makeConstraintArray,
  makeCreateSingleArray,
  makeCb,
} = require('../utils/genNeo4jQuery');
const { demoTags } = require('../sample/ipsum.js');

const dataArray = demoTags;
// Tag { word: 'avocado' }
const nodeVar = 't';
const nodeLabel = 'Tag';
const nodeProp = 'word';

const constraintArray = makeConstraintArray(nodeVar, nodeLabel, nodeProp);

const queryArray = makeCreateSingleArray(dataArray, nodeVar, nodeLabel, nodeProp);

const cb = makeCb(nodeLabel);

cypherMulti(constraintArray, cb);
cypherMulti(queryArray, cb);
