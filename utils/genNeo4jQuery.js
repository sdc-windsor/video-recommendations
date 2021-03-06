const makeRandomIndex = require('./genRandomIndex.js');
const { demoCategories, demoTags } = require('../sample/ipsum.js');
//  [{ statement: query, parameters: params }]
const makeConstraintArray = (nodeVar, nodeLabel, nodeProp) => [{
  statement: `CREATE CONSTRAINT ON (${nodeVar}:${nodeLabel}) ASSERT ${nodeVar}.${nodeProp} IS UNIQUE`,
  parameters: null,
}];

// dataArray = ['animation', 'food', ...]
// nodeProp = 'Category'
// dataArray = [`{author:'test', plays: 2}`, `{author:'test2', plays: 3}`, `{author:'test2', plays: 3}`]
// nodeProp = null
const makeCreateSingleArray = (dataArray, nodeVar, nodeLabel, nodeProp) => dataArray.map((string) => {
  const object = {};
  if (nodeProp !== null) {
    object.statement = `CREATE (${nodeVar}:${nodeLabel} {${nodeProp}: '${string}'})`;
  } else {
    object.statement = `CREATE (${nodeVar}:${nodeLabel} ${string})`;
  }
  object.parameters = null;
  return object;
});

// use as Neo4j HTTP statements
// create a Video node
// create Video BELONGS_TO Category relationship
const makeCreateMultiQuery = (dataArray, nodeLabel) => {
  const object = {};
  const randomCategory = demoCategories[makeRandomIndex(demoCategories.length)];
  let queryString = `MATCH (c:Category {name:'${randomCategory}'}) CREATE `;
  for (let i = 0; i < dataArray.length; i += 1) {
    // CREATE (:Video {author:'test', plays: 2}), (:Video {author:'test2', plays: 3})
    if (i === dataArray.length - 1) {
      queryString += `(:${nodeLabel} ${dataArray[i]})-[:BELONGS_TO]->(c)`;
    } else {
      queryString += `(:${nodeLabel} ${dataArray[i]})-[:BELONGS_TO]->(c),`;
    }
  }
  object.statement = queryString;
  object.parameters = null;
  return object;
};

// use as Neo4j Driver query
// create a Video node
// create Video BELONGS_TO Category relationship
const makeCreateMultiString = (dataArray, nodeLabel) => {
  const randomCategory = demoCategories[makeRandomIndex(demoCategories.length)];
  let queryString = `MATCH (c:Category {name:'${randomCategory}'}) CREATE `;
  for (let i = 0; i < dataArray.length; i += 1) {
    // dataArray = [{author:'test', plays: 2}, {author:'test2', plays: 3}]
    // create node:
    // CREATE (:Video {author:'test', plays: 2}), (:Video {author:'test2', plays: 3})
    // create node - category relationship
    // (:Video {author:'test', plays: 2})-[BELONGS_TO]->(c:Category {name:'food'})
    // create node - has tag relationship
    if (i === dataArray.length - 1) {
      queryString += `(:${nodeLabel} ${dataArray[i]})-[:BELONGS_TO]->(c) return c`;
    } else {
      queryString += `(:${nodeLabel} ${dataArray[i]})-[:BELONGS_TO]->(c),`;
    }
  }
  return queryString;
};

// create Video HAS_TAG relationship
// x number of HAS_TAG relationships per video
// MATCH (v:Video), (t:Tag) where id(v) = 1000 and t.word = 'stumptown' create (v)-[:HAS_TAG]->(t)
const makeVideoHasTagString = (id, word) => {
  const object = {};
  const queryString = `MATCH (v:Video), (t:Tag) where id(v) = ${id} and t.word = '${word}' create (v)-[:HAS_TAG]->(t)`;
  object.statement = queryString;
  object.parameters = null;
  return object;
};
// MATCH (v:Video), (a:Tag), (b:Tag)
// where id(v) = 1000 and a.word = 'stumptown' and b.word='letterpress'
// create (v)-[:HAS_TAG]->(a), (v)-[:HAS_TAG]->(b)

const makeVideoHasMultiTagString = (id) => {
  const tags = [demoTags[makeRandomIndex(demoTags.length)], demoTags[makeRandomIndex(demoTags.length)], demoTags[makeRandomIndex(demoTags.length)]];
  return `MATCH (v:Video), (a:Tag), (b:Tag), (c:Tag) WHERE id(v) = ${id} and a.word = '${tags[0]}' and b.word = '${tags[1]}' and c.word = '${tags[2]}' create (v)-[:HAS_TAG]->(a), (v)-[:HAS_TAG]->(b), (v)-[:HAS_TAG]->(c)`;
};

// USING Neo4j HTTP
// data => data.results[0].data.map(result => result.row[0]);
const mapResponse = apiData => apiData.body.results[0].data.map((result) => {
  const videoInfo = result.row[0];
  videoInfo.id = result.meta[0].id;
  return videoInfo;
});
// sample returned data shape: https://neo4j.com/docs/http-api/current/http-api-actions/execute-multiple-statements/

const makeCb = nodeLabel => (err, data) => {
  if (err) {
    console.log(`seed ${nodeLabel} nodes error: ${err}`);
  } else {
    const response = mapResponse(data);
    console.log(JSON.stringify(data));
    console.log(`seed ${nodeLabel} nodes success: ${JSON.stringify(response)}`);
  }
};

module.exports = {
  makeConstraintArray,
  makeCreateSingleArray,
  makeCreateMultiQuery,
  makeCreateMultiString,
  makeVideoHasTagString,
  makeVideoHasMultiTagString,
  mapResponse,
  makeCb,
};
