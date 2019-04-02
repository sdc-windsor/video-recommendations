const { gql } = require('apollo-server-express');

// // Connect to either MySQL or Neo4j
// const { getRecVideosAsync } = require('../db-mysql/db.js');
const getRecVideosAsync = require('../db-neo4j/queries/getRecVideosAsync.js');

// Additional CRUD Ops
const addTagAsync = require('../db-neo4j/queries/addTagAsync.js');
const updatePlayCountAsync = require('../db-neo4j/queries/updatePlayCountAsync.js');
const removeTagAsync = require('../db-neo4j/queries/removeTagAsync.js');

const localImagePath = '../../sample/images';
const s3ImagePath = 'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images';

const typeDefs = gql`
  type Video {
    title: String
    author: String
    thumbnail: String
    plays: Int
    tag_id: Int
  }
  type Query {
    getRecommendations(videoId: Int): [Video]
  }
`;

const resolvers = {
  Query: {
    getRecommendations(parent, args) {
      return getRecVideosAsync(args.videoId, s3ImagePath);
    },
  },
  // Mutation: {
  //   addVideoAsync,
  //   updatePlayCountAsync,
  //   removeTagAsync,
  // },
};

module.exports = {
  typeDefs,
  resolvers,
};
