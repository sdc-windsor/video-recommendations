// // for Apollo-GraphQL
const Promise = require('bluebird');
const cypherMulti = require('../db.js');

const removeTagAsync = (videoId, tagWord) => {
  const neo4jQuery = `MATCH (v:Video)-[r:HAS_TAG]->(t:Tag) WHERE id(v) = ${videoId} AND t.word = "${tagWord}" DELETE r`;
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];
  const taskStart = new Date();

  return new Promise((resolve, reject) => {
    cypherMulti(statementsArray, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Neo4j query took ${new Date() - taskStart} ms`);
        resolve(res);
      }
    });
  });
};

module.exports = removeTagAsync;
