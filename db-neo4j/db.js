// /////////////////Using Neo4j HTTP API////////////////////////////////////
const request = require('request');
const Promise = require('bluebird');
const { mapResponse } = require('../utils/genNeo4jQuery.js');

const dbUrl = 'http://localhost:7474/db/data/transaction/commit';
const basicAuth = 'Basic bmVvNGo6c2Rj';

const cypherMulti = (statementsArray, cb) => {
  request.post({
    uri: dbUrl,
    json: { statements: statementsArray },
    headers: {
      Authorization: basicAuth,
    },
  },
  (err, res) => { cb(err, res); });
};

// // for Express API
const getRecVideos = (videoId, callback) => {
  const videoCount = 10;
  const neo4jQuery = `MATCH (v:Video)-[:HAS_TAG]->(t:Tag)<-[:HAS_TAG]-(r:Video)-[:BELONGS_TO]->(c:Category)<-[:BELONGS_TO]-(v:Video) WHERE id(v) = ${videoId} RETURN r LIMIT ${videoCount}`;
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];
  const neot1 = new Date();

  cypherMulti(statementsArray, (err, res) => {
    if (err) {
      console.log(`Query Neo4j error: ${err}`);
    } else {
      console.log(`Neo4j query took ${new Date() - neot1} ms`);
      callback(mapResponse(res));
    }
  });
};

// // for Apollo-GraphQL
const getRecVideosAsync = (videoId, imagePath) => {
  const videoCount = 10;
  const neo4jQuery = `MATCH (v:Video)-[:HAS_TAG]->(t:Tag)<-[:HAS_TAG]-(r:Video)-[:BELONGS_TO]->(c:Category)<-[:BELONGS_TO]-(v:Video) WHERE id(v) = ${videoId} RETURN r LIMIT ${videoCount}`;
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];
  const neot2 = new Date();

  return new Promise((resolve, reject) => {
    cypherMulti(statementsArray, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${new Date() - neot2} ms`);
        const mappedResponse = mapResponse(res);
        mappedResponse.forEach((video) => {
          video.thumbnail = `${imagePath}/${video.thumbnailIndex}.jpg`;
        });
        resolve(mappedResponse);
      }
    });
  });
};

// res
// {"statusCode":200,
// "body":{
// "results":[{"columns":["r"],"data":[]}],"errors":[]},"headers":{"connection":"close","date":"Fri, 29 Mar 2019 23:38:45 GMT","access-control-allow-origin":"*","content-type":"application/json","content-length":"53"},"request":{"uri":{"protocol":"http:","slashes":true,"auth":null,"host":"localhost:7474","port":"7474","hostname":"localhost","hash":null,"search":null,"query":null,"pathname":"/db/data/transaction/commit","path":"/db/data/transaction/commit","href":"http://localhost:7474/db/data/transaction/commit"},"method":"POST","headers":{"Authorization":"Basic bmVvNGo6c2Rj","accept":"application/json","content-type":"application/json","content-length":197}}}

// mapped results
// [ { plays: '1778',
//     thumbnailIndex: '62',
//     author: 'jillianhardy',
//     title: 'a meh swag bushwick. Cray tousled' },
//   { plays: '3255',
//     thumbnailIndex: '88',
//     author: 'corybuchanan',
//     title: 'illiamsburg taxidermy activated' } ]

module.exports = {
  cypherMulti,
  getRecVideos,
  getRecVideosAsync,
};


// /////////////////Using Neo4j Driver for JS////////////////////////////////////
// const neo4j = require('neo4j-driver').v1;

// const uri = 'bolt://localhost';
// const username = 'neo4j';
// const pw = 'sdc';
// const driver = neo4j.driver(uri, neo4j.auth.basic(username, pw));
// const session = driver.session();

// module.exports = {
//   session,
// };
