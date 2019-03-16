const express = require('express');
// const graphqlHTTP = require('express-graphql');
const db = require('../db-mysql/db.js');
// const { schema, root } = require('./graphql.js');

const app = express();

// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue: root,
//   graphiql: true,
// }));

module.exports = app;
