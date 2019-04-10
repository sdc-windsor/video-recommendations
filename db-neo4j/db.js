const dbUrlAWS = 'ec2-54-241-154-133.us-west-1.compute.amazonaws.com/';
// /////////////////Using Neo4j HTTP API////////////////////////////////////
const request = require('request');

const path = 'db/data/transaction/commit';
const dbUrlLocal = 'http://localhost:7474/';
// 64 basic encoding: 'neo4j:sdc'
const basicAuth = 'Basic bmVvNGo6c2Rj';

const cypherMulti = (statementsArray, cb) => {
  request.post({
    uri: `http://${dbUrlAWS}${path}`,
    json: { statements: statementsArray },
    headers: {
      Authorization: basicAuth,
    },
  },
  (err, res) => { cb(err, res); });
};

module.exports = cypherMulti;

// /////////////////Using Neo4j Driver for JS////////////////////////////////////
// const neo4j = require('neo4j-driver').v1;

// // const uri = 'bolt://localhost';
// const username = 'neo4j';
// const pw = 'sdc';
// const driver = neo4j.driver(`bolt://${dbUrlAWS}`, neo4j.auth.basic(username, pw));
// const session = driver.session();

// module.exports = {
//   session,
// };
