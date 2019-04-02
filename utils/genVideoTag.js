// tags: 235
// videos: 10000000
const makeRandomIndex = require('./genRandomIndex.js');

const tagsMin = 1;
const tagsMax = 235;

const tagsPerVideoMax = 6;
const tagsPerVideoMin = 1;

// videoId = 101
// result = [5, 101, 24, 101, 223, 101, 23, 101]
const makeVideoTag = (videoId) => {
  const tagCount = makeRandomIndex(tagsPerVideoMax, tagsPerVideoMin);
  const result = [];
  for (let i = 0; i < tagCount; i += 1) {
    result.push(makeRandomIndex(tagsMax, tagsMin));
    result.push(videoId);
  }
  return result;
};

module.exports = {
  makeVideoTag,
};
