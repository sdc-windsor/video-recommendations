const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./graphql-app.js');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const port = process.env.PORT || 3002;

apolloServer.listen(port)
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((err) => {
    console.log(`Error starting apolloServer: ${err}`);
  });
