const Promise = require('bluebird');

// redis cache
// {
//   id: {
//     9000001: '100 results string',
//     9999999: '100 results string',...
//   },
//   categoryTag: {
//     'fashion$hipster': '300 results string',
//     'education$coffee': '300 results string',...
//   }
// }

const hgetCategoryTagAsync = (client, categoryTag) => new Promise((resolve, reject) => {
  client.hget('categoryTag', categoryTag, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.parse(res));
    }
  });
});

module.exports = hgetCategoryTagAsync;
