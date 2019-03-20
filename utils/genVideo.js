const {
  demoNames, demoText, demoCategories,
} = require('../sample/ipsum.js');
const makeRandomIndex = require('./genRandomIndex.js');

const demoNamesMax = demoNames.length;
const demoTextMax = demoText.length;
const titleMin = 10;
const titleMax = 36;
const playMax = 10001;
const imageMin = 1; // due to S3 file pathname
const imageMax = 101;
const categoryMin = 1; // due to sql table id starts at 1
const categoryMax = demoCategories.length;

const makeVideoDetails = () => {
  const startIndex = makeRandomIndex(demoTextMax);
  return [
    // author
    demoNames[makeRandomIndex(demoNamesMax)] + demoNames[makeRandomIndex(demoNamesMax)],
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

module.exports = {
  makeVideoDetails,
};
