const redis = require('redis');

const devConf = {
  host: '127.0.0.1',
  port: '6379',
};

const prodConf = {
  host: '54.193.59.71',
  port: '6379',
};

const client = redis.createClient(prodConf);

client.on('error', (err) => {
  console.log(`Redis error: ${err}`);
});

client.on('connect', () => {
  console.log('Reids connected');
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
