const request = require('request');

const dbUrl = 'http://localhost:7474/db/data/transaction/commit';
function cypher(query, params, cb) {
  request.post({
    uri: dbUrl,
    json: { statements: [{ statement: query, parameters: params }] },
    headers: {
      Authorization: 'Basic bmVvNGo6dGVzdA==',
    },
  },
  (err, res) => { cb(err, res.body); });
}

const query = 'MATCH (v:Video) RETURN v.title';
// const params = { limit: 10 };
const cb = function (err, data) {
  if (err) {
    console.log(`query neo4j db err: ${err}`);
  } else {
    const response = data.results[0].data.map(result => result.row[0]);
    console.log(JSON.stringify(response));
  }
};

cypher(query, null, cb);

// if requesting the whole node, each row[0] is an object
// if requesting only one property, each row[0] is the value
const rawData = {
  results: [
    {
      columns: ['v'],
      data: [
        {
          row: [
            {
              plays: 200,
              thumbnailIndex: 66,
              author: 'test author',
              title: 'test title',
            },
          ],
          meta: [
            {
              id: 0,
              type: 'node',
              deleted: false,
            },
          ],
        },
        {
          row: [
            {
              plays: 100,
              thumbnailIndex: 33,
              author: 'test author 2',
              title: 'test title 2',
            },
          ],
          meta:
          [
            {
              id: 1,
              type: 'node',
              deleted: false,
            },
          ],
        },
      ],
      errors: [],
    },
  ],
};
