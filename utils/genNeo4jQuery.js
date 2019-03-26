const makeRandomIndex = require('./genRandomIndex.js');
const { demoCategories } = require('../sample/ipsum.js');
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
const makeCreateMultiQuery = (dataArray, nodeLabel) => {
  const object = {};
  let queryString = 'CREATE ';
  for (let i = 0; i < dataArray.length; i += 1) {
    // CREATE (:Video {author:'test', plays: 2}), (:Video {author:'test2', plays: 3})
    if (i === dataArray.length - 1) {
      queryString += `(:${nodeLabel} ${dataArray[i]})`;
    } else {
      queryString += `(:${nodeLabel} ${dataArray[i]}),`;
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
  let queryString = `match (c:Category{name:'${randomCategory}'}) CREATE `;
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

// data => data.results[0].data.map(result => result.row[0]);
const mapResponse = apiData => apiData.results[0].data.map(result => result.row[0]);
// sample returned data shape: https://neo4j.com/docs/http-api/current/http-api-actions/execute-multiple-statements/

const makeCb = nodeLabel => (err, data) => {
  if (err) {
    console.log(`seed ${nodeLabel} nodes error: ${err}`);
  } else if (data.errors.length > 0) {
    console.log(`seed ${nodeLabel} nodes error: ${JSON.stringify(data.errors[0])}`);
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
  mapResponse,
  makeCb,
};
