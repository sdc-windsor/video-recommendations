// // for Apollo-GraphQL
const Promise = require('bluebird');
const cypherMulti = require('../db.js');
const { mapResponse } = require('../../utils/genNeo4jQuery.js');

const updatePlayCountAsync = (videoId, imagePath) => {
  const getPlayCountQuery = `MATCH (v:Video) WHERE id(v) = ${videoId} SET v.plays = toInt(v.plays) + 1 return v`;
  const getPlayCountStatementsArray = [{ statement: getPlayCountQuery, parameters: null }];
  const taskStart = new Date();

  return new Promise((resolve, reject) => {
    cypherMulti(getPlayCountStatementsArray, (err, res) => {
      if (err) {
        console.log(`update play count error + ${err}`);
        reject(err);
      } else {
        console.log(`Neo4j update play count query took ${new Date() - taskStart} ms`);
        const mappedResponse = mapResponse(res)[0];
        mappedResponse.thumbnail = `${imagePath}/${mappedResponse.thumbnailIndex}.jpg`;
        resolve(mappedResponse);
      }
    });
  });
};

module.exports = updatePlayCountAsync;
