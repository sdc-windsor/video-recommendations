const gzipStatic = require('connect-gzip-static');
const cors = require('cors');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const { typeDefs, resolvers } = require('./graphql-app.js');

// use node cluster
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  // app.use(express.static(path.join(__dirname, '../dist'), { maxAge: '1m' }));

  // serve .gz file instead
  app.use(gzipStatic(path.join(__dirname, '../dist'), { maxAge: 86400000 }));
  app.use(cors());

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  const port = process.env.PORT || 3002;

  apolloServer.applyMiddleware({ app }); // path default to /graphql
  console.log(`Worker ${process.pid} started`);
  app.listen(port, () => {
    console.log(`Apollo server ready at ${port}${apolloServer.graphqlPath}`);
  });
}
