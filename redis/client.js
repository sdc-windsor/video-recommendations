const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Redis error: ${err}`);
});

// redis cache
// {
//   id: {
//     9000001: 100 results,
//     9999999: 100 results,...
//   },
//   categoryTag: {
//     'fashion$hipster': 500 results,
//     'education$coffee': 500 results,...
//   }
// }

module.exports = client;
