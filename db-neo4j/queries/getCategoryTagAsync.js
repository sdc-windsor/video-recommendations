const Promise = require('bluebird');
const cypherMulti = require('../db.js');

const getCategoryTagAsync = (videoId) => {
  // for load testing purpose, query a randomly generated id
  const id = Math.floor(Math.random() * 100000) + 9000000;
  const neo4jQuery = `MATCH (c:Category)<-[:BELONGS_TO]-(v:Video)-[:HAS_TAG]->(t:Tag) WHERE id(v) = ${id} RETURN c, t LIMIT 1`;
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];
  // const taskStart = new Date();

  return new Promise((resolve, reject) => {
    cypherMulti(statementsArray, (err, res) => {
      if (err) {
        console.log(`caching query Neo4j db error. video id: ${videoId}`);
        reject(err);
      } else {
        let name;
        let word;
        if (res.body.results[0].data[0]) {
          name = res.body.results[0].data[0].row[0].name;
          word = res.body.results[0].data[0].row[1].word;
        } else {
          name = 'fashion';
          word = 'avocado';
        }
        // console.log(`complete caching query in ${new Date() - taskStart} ms`);
        resolve({ name, word });
      }
    });
  });
};

module.exports = getCategoryTagAsync;
