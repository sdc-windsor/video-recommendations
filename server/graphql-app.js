const { gql } = require('apollo-server-express');
const { getRecVideosAsync } = require('../db-mysql/db.js');

const typeDefs = gql`
  type Video {
    title: String
    author: String
    thumbnailIndex: Int
  }

  type Query {
    getRecommendations(videoId: Int): [Video]
  }
`;

const resolvers = {
  Query: {
    getRecommendations(parent, args, context, info) {
      return getRecVideosAsync(args.videoId);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

