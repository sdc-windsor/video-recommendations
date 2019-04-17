// warm the cache to improve query performance
const getRecVideosAsync = require('./getRecVideosAsync.js');

const s3ImagePath = 'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images';

const neo4jWarmup = (nodeStart, nodeEnd) => {
  for (let i = nodeStart; i <= nodeEnd; i += 1) {
    getRecVideosAsync(i, s3ImagePath);
  }
};

module.exports = neo4jWarmup;
