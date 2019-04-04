// // for Apollo-GraphQL
const Promise = require('bluebird');
const cypherMulti = require('../db.js');
const { mapResponse } = require('../../utils/genNeo4jQuery.js');

const getRecVideosAsync = (videoId, imagePath) => {
  const videoCount = 10;
  const neo4jQuery = `MATCH (v:Video)-[:HAS_TAG]->(t:Tag)<-[:HAS_TAG]-(r:Video)-[:BELONGS_TO]->(c:Category)<-[:BELONGS_TO]-(v:Video) WHERE id(v) = ${videoId} RETURN r LIMIT ${videoCount}`;
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];
  const taskStart = new Date();

  return new Promise((resolve, reject) => {
    cypherMulti(statementsArray, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Neo4j get video recommendations query took ${new Date() - taskStart} ms`);
        const mappedResponse = mapResponse(res);
        mappedResponse.forEach((video) => {
          video.thumbnail = `${imagePath}/${video.thumbnailIndex}.jpg`;
        });
        resolve(mappedResponse);
      }
    });
  });
};

module.exports = getRecVideosAsync;
