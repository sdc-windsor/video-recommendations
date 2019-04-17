const { gql } = require('apollo-server-express');
const { categoryTagCache } = require('./serverCache.js');

// // Connect to either MySQL or Neo4j
// const { getRecVideosAsync } = require('../db-mysql/db.js');
const getRecVideosAsync = require('../db-neo4j/queries/getRecVideosAsync.js');
const getCategoryTagAsync = require('../db-neo4j/queries/getCategoryTagAsync.js');

// Additional CRUD Ops
const addTagAsync = require('../db-neo4j/queries/addTagAsync.js');
const updatePlayCountAsync = require('../db-neo4j/queries/updatePlayCountAsync.js');
const removeTagAsync = require('../db-neo4j/queries/removeTagAsync.js');

const localImagePath = '../../sample/images';
const s3ImagePath = 'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images';

const typeDefs = gql`
  type Video {
    id: Int
    title: String
    author: String
    thumbnail: String
    plays: Int
  }
  type Tag {
    word: String
  }
  type Query {
    getRecommendations(videoId: Int): [Video]
    addTag(videoId: Int, tagWord: String): Tag
    updatePlays(videoId: Int): Video
    removeTag(videoId: Int, tagWord: String): Tag
  }
`;

// cache 'category'+'keyword': result
// const getRecommendationsCache = {};

const resolvers = {
  Query: {
    getRecommendations(parent, args) {
      const start = new Date();
      return getCategoryTagAsync(args.videoId)
        .then((categoryTagObject) => {
          const key = `${categoryTagObject.name}$${categoryTagObject.word}`;
          if (categoryTagCache[key]) {
            console.log(`cached: fetch results in ${new Date() - start} ms`);
            return categoryTagCache[key];
          }
          console.log(`new: fetch results in ${new Date() - start} ms`);
          return getRecVideosAsync(categoryTagObject, s3ImagePath);
        })
        .catch((err) => {
          console.log(`getRec error: ${JSON.stringify(err)}`);
        });
    },
    addTag(parent, args) {
      return addTagAsync(args.videoId, args.tagWord);
    },
    updatePlays(parent, args) {
      return updatePlayCountAsync(args.videoId, s3ImagePath);
    },
    removeTag(parent, args) {
      return removeTagAsync(args.videoId, args.tagWord);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
