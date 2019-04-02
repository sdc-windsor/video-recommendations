// // for Apollo-GraphQL
const Promise = require('bluebird');
const cypherMulti = require('../db.js');

// create a new (video)-[:HAS_TAG]->(tag) relationship
const addTagAsync = (videoId, tagWord) => {
  const neo4jQuery = `MATCH (v:Video), (t:Tag) WHERE id(v) = ${videoId} AND t.word = "${tagWord}" MERGE (v)-[:HAS_TAG]->(t)`;
  const statmentArray = [{ statement: neo4jQuery, parameters: null }];
  const taskStart = new Date();

  return new Promise((resolve, reject) => {
    cypherMulti(statmentArray, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Neo4j query took ${new Date() - taskStart} ms`);
        resolve(res);
      }
    });
  });
};

module.exports = addTagAsync;
