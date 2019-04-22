const Promise = require('bluebird');

const hgetIdAsync = (client, id) => new Promise((resolve, reject) => {
  client.hget('id', id, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(res));
    }
  });
});

module.exports = hgetIdAsync;
