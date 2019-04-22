// // for Express API
const cypherMulti = require('../db.js');
const { mapResponse } = require('../../utils/genNeo4jQuery.js');

const getRecVideos = (videoId, callback) => {
  const videoCount = 30;
  const neo4jQuery = `MATCH (v:Video)-[:HAS_TAG]->(t:Tag)<-[:HAS_TAG]-(r:Video)-[:BELONGS_TO]->(c:Category)<-[:BELONGS_TO]-(v:Video) WHERE id(v) = ${videoId} RETURN r LIMIT ${videoCount}`;
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];
  const taskStart = new Date();

  cypherMulti(statementsArray, (err, res) => {
    if (err) {
      console.log(`Query Neo4j error: ${err}`);
    } else {
      console.log(`Neo4j get video recommendations query took ${new Date() - taskStart} ms`);
      callback(mapResponse(res));
    }
  });
};

module.exports = getRecVideos;
