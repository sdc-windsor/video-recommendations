// // for Apollo-GraphQL
const Promise = require('bluebird');
const cypherMulti = require('../db.js');
const { mapResponse } = require('../../utils/genNeo4jQuery.js');

const getRecVideosAsync = (categoryTagObject) => {
  const { name, word } = categoryTagObject;
  const videoCount = 30;
  const neo4jQuery = `MATCH (t:Tag)<-[:HAS_TAG]-(v:Video)-[:BELONGS_TO]->(c:Category) WHERE c.name = "${name}" AND t.word = "${word}" RETURN v LIMIT ${videoCount}`;
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];

  return new Promise((resolve, reject) => {
    cypherMulti(statementsArray, (error, response) => {
      if (error) {
        console.log(`query Neo4j db error. categoryTagObject: ${JSON.stringify(categoryTagObject)}`);
        reject(error);
      } else {
        const mappedResponse = mapResponse(response);
        resolve(mappedResponse);
      }
    });
  });
};

module.exports = getRecVideosAsync;
