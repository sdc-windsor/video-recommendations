const { text, names, category } = require('./rawIpsum.js');

const tagCount = 501;

module.exports = {
  demoTags: text.split(' ').slice(0, tagCount)
    .map(word => word.replace(/[.,]/g, '').toLowerCase())
    .reduce((res, word) => {
      if (res.indexOf(word) === -1) {
        res.push(word);
      }
      return res;
    }, []),
  demoNames: names.split('\n')
    .map(name => name.replace(/"/g, '').split(','))
    .reduce((res, arr) => {
      arr.forEach((el) => {
        res.push(el.trim());
      });
      return res;
    }, []),
  demoText: text,
  demoCategories: category,
};

// ~10k text length for making titles
// 4500 unique author names
// 100 unique images

// image url `https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images/{$number}.jpg`
