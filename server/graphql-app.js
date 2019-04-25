const { gql } = require('apollo-server-express');

const redisClient = require('../redis/client.js');
const HGETCategoryTag = require('../redis/hgetCategoryTagAsync.js');
const HSETCategoryTag = require('../redis/hsetCategoryTagAsync.js');
const HGETIdTag = require('../redis/hgetIdAsync.js');
const HSETIdTag = require('../redis/hsetIdAsync.js');

// // Connect to either MySQL or Neo4j
// const { getRecVideosAsync } = require('../db-mysql/db.js');
const getRecVideosAsync = require('../db-neo4j/queries/getRecVideosAsync.js');
const getCategoryTagAsync = require('../db-neo4j/queries/getCategoryTagAsync.js');

// Additional CRUD Ops
const addTagAsync = require('../db-neo4j/queries/addTagAsync.js');
const updatePlayCountAsync = require('../db-neo4j/queries/updatePlayCountAsync.js');
const removeTagAsync = require('../db-neo4j/queries/removeTagAsync.js');

const typeDefs = gql`
  type Video {
    id: Int
    title: String
    author: String
    thumbnailIndex: Int
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
      return HGETIdTag(redisClient, args.videoId)
        .then((redisIdRes) => {
          if (redisIdRes !== null) {
            console.log(`fetched id results from redis in ${new Date() - start}ms`);
            return redisIdRes;
          }
          return getCategoryTagAsync(args.videoId)
            .then((categoryTagObject) => {
              const key = `${categoryTagObject.name}$${categoryTagObject.word}`;
              return HGETCategoryTag(redisClient, key)
                .then((redisCategoryTagRes) => {
                  if (redisCategoryTagRes !== null) {
                    console.log(`fetched category tag results from redis in ${new Date() - start}ms`);
                    return redisCategoryTagRes;
                  }
                  return getRecVideosAsync(categoryTagObject)
                    .then((res) => {
                      HSETCategoryTag(redisClient, key, res)
                        .then(result => console.log('set new redis category tag success'));
                      HSETIdTag(redisClient, args.videoId, res)
                        .then(result => console.log('set new redis id success'));
                      console.log(`get rec videos in ${new Date() - start} ms`);
                      return res;
                    });
                });
            });
        });
    },
    // Additional CRUD Ops available
    addTag(parent, args) {
      return addTagAsync(args.videoId, args.tagWord);
    },
    updatePlays(parent, args) {
      return updatePlayCountAsync(args.videoId);
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
