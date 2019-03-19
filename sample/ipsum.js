const { text, names, category } = require('./rawIpsum.js');

module.exports = {
  demoTags: text.split(' ').slice(0, 501).map(word => word.replace(/[.,]/g, '').toLowerCase()),
  demoNames: names.split('\n')
    .map(name => name.replace(/"/g, '').split(','))
    .reduce((res, arr) => {
      arr.forEach((el) => {
        res.push(el);
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
