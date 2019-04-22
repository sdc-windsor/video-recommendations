const Promise = require('bluebird');

const hsetCategoryTagAsync = (client, categoryTag, videos) => new Promise((resolve, reject) => {
  client.hset('categoryTag', categoryTag, JSON.stringify(videos), (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

module.exports = hsetCategoryTagAsync;
