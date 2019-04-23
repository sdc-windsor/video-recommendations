require('newrelic');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const { typeDefs, resolvers } = require('./graphql-app.js');

const app = express();

app.use(express.static(path.join(__dirname, '../dist'), { maxAge: '1m' }));
app.use(cors());

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const port = process.env.PORT || 3002;

apolloServer.applyMiddleware({ app }); // path default to /graphql

app.listen(port, () => {
  console.log(`Apollo server ready at ${port}${apolloServer.graphqlPath}`);
});
