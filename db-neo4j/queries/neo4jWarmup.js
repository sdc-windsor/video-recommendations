// warm the cache to improve query performance
const getRecVideosAsync = require('./getRecVideosAsync.js');

const neo4jWarmup = (nodeStart, nodeEnd) => {
  for (let i = nodeStart; i <= nodeEnd; i += 1) {
    getRecVideosAsync(i);
  }
};

module.exports = neo4jWarmup;
