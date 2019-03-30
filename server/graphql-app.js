const { gql } = require('apollo-server');
const { getRecVideos } = require('../db-mysql/db.js');

const typeDefs = gql`
  type Video {
    title: String
    author: String
    thumbnailIndex: Int
  }

  type Query {
    recommendations(videoId: Int): [Video]
  }
`;

const resolvers = {
  Query: {
    recommendations(videoId) {
      return getRecVideos(videoId, res => res);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

