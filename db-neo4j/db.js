// /////////////////Using Neo4j HTTP API////////////////////////////////////
// const request = require('request');

// const dbUrl = 'http://localhost:7474/db/data/transaction/commit';
// const basicAuth = 'Basic bmVvNGo6c2Rj';

// const cypherMulti = (statementsArray, cb) => {
//   request.post({
//     uri: dbUrl,
//     json: { statements: statementsArray },
//     headers: {
//       Authorization: basicAuth,
//     },
//   },
//   (err, res) => { cb(err, res); });
// };

// module.exports = {
//   cypherMulti,
// };

// /////////////////Using Neo4j Driver for JS////////////////////////////////////
const neo4j = require('neo4j-driver').v1;

const uri = 'bolt://localhost';
const username = 'neo4j';
const pw = 'sdc';
const driver = neo4j.driver(uri, neo4j.auth.basic(username, pw));
const session = driver.session();

module.exports = {
  session,
};
