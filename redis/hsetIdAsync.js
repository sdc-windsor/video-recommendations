const Promise = require('bluebird');

const hsetIdAsync = (client, id, videos) => new Promise((resolve, reject) => {
  client.hset('id', id, JSON.stringify(videos), (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

module.exports = hsetIdAsync;
