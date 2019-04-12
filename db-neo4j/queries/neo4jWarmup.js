// warm the cache to improve query performance
const cypherMulti = require('../db.js');

const neo4jWarmup = (nodeStart, nodeEnd) => {
  const neo4jQuery = `MATCH (n) OPTIONAL MATCH (n)-[r]->() WHERE id(n) >= ${nodeStart} AND id(n) <= ${nodeEnd} RETURN count(n.prop) + count(r.prop)`;
  // const neo4jQuery = 'MATCH (v:Video)-[r:HAS_TAG]->(t:Tag) WHERE id(v) = 1010000 return t';
  const statementsArray = [{ statement: neo4jQuery, parameters: null }];
  const warmStart = new Date();

  cypherMulti(statementsArray, (err, res) => {
    if (err) {
      console.log(`Query Neo4j error: ${err}`);
    } else {
      console.log(JSON.stringify(res.body));
      console.log(`Neo4j warmed up, touched nodes from ${nodeStart} to ${nodeEnd}. Warmup took ${new Date() - warmStart} ms`);
    }
  });
};

module.exports = neo4jWarmup;
