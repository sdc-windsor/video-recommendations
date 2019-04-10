// Using Neo4j HTTP API


const cypherMulti = require('../db-neo4j/db.js');
const {
  makeConstraintArray,
  makeCreateSingleArray,
  makeCb,
} = require('../utils/genNeo4jQuery');
const { demoCategories } = require('../sample/ipsum.js');

const dataArray = demoCategories;
// Category { name: 'food' }
const nodeVar = 'c';
const nodeLabel = 'Category';
const nodeProp = 'name';

const constraintArray = makeConstraintArray(nodeVar, nodeLabel, nodeProp);

const queryArray = makeCreateSingleArray(dataArray, nodeVar, nodeLabel, nodeProp);

const cb = makeCb(nodeLabel);

cypherMulti(constraintArray, cb);
cypherMulti(queryArray, cb);
