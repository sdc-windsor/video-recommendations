const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const { typeDefs, resolvers } = require('./graphql-app.js');

const app = express();

app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const port = process.env.PORT || 3002;

apolloServer.applyMiddleware({ app }); // path default to /graphql

app.listen(port, () => console.log(`Apollo server ready at ${port}`));
