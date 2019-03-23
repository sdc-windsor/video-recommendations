//  [{ statement: query, parameters: params }]
const makeConstraintArray = (nodeVar, nodeLabel, nodeProp) => [{
  statement: `CREATE CONSTRAINT ON (${nodeVar}:${nodeLabel}) ASSERT ${nodeVar}.${nodeProp} IS UNIQUE`,
  parameters: null,
}];

// dataArray = ['animation', 'food', ...]
// nodeProp = 'Category'
// dataArray = [`{author:'test', plays: 2}`, `{author:'test2', plays: 3}`]
// nodeProp = null
const makeQueryArray = (dataArray, nodeVar, nodeLabel, nodeProp) => dataArray.map((string) => {
  const object = {};
  if (nodeProp !== null) {
    object.statement = `MERGE (${nodeVar}:${nodeLabel} {${nodeProp}: '${string}'}) return ${nodeVar}`;
  } else {
    object.statement = `MERGE (${nodeVar}:${nodeLabel} ${string}) return ${nodeVar}`;
  }
  object.parameters = null;
  return object;
});

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
  makeQueryArray,
  mapResponse,
  makeCb,
};
