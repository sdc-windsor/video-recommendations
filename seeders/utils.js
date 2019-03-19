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

module.exports = {
  makeVideoDetails,
};
