const request = require('request');

const dbUrl = 'http://localhost:7474/db/data/transaction/commit';

const cypherMulti = (statementsArray, cb) => {
  request.post({
    uri: dbUrl,
    json: { statements: statementsArray },
    headers: {
      Authorization: 'Basic bmVvNGo6dGVzdA==',
    },
  },
  (err, res) => { cb(err, res.body); });
};


module.exports = {
  cypherMulti,
};
