// Use Neo4j HTTP
const Promise = require('bluebird');
const { demoTags } = require('../sample/ipsum.js');
const makeRandomIndex = require('../utils/genRandomIndex');
const { makeVideoHasTagString } = require('../utils/genNeo4jQuery');
const cypherMultiAsync = Promise.promisify(require('../db-neo4j/db.js'));

// this script CREATEs Video HAS_TAG relationship
// MATCH (v:Video), (t:Tag) where id(v) = 1000 and t.word = 'stumptown' create (v)-[:HAS_TAG]->(t)

// Video node id starts at 255
// let videoIdStart = 11;
// const videoIdEnd = 250000;
// const videosPerBatch = 1000;
let videoIdStart = 959890;
const videoIdEnd = 1100000;
const videosPerBatch = 500;
const tagMax = 5;
const tagMin = 1;

const singleBatch = [];

const sessionStart = new Date();

const VideoHasTagAsync = () => {
  for (let i = videoIdStart; i < videoIdStart + videosPerBatch; i += 1) {
    const tagCount = makeRandomIndex(tagMax, tagMin);
    for (let j = tagMin; j < tagCount; j += 1) {
      singleBatch.push(makeVideoHasTagString(i, demoTags[makeRandomIndex(demoTags.length)]));
    }
  }

  cypherMultiAsync(singleBatch)
    .then(() => {
      while (singleBatch.length > 0) {
        singleBatch.pop();
      }
    })
    .then(() => {
      videoIdStart += videosPerBatch;
      console.log(`total ${new Date() - sessionStart} milliseconds`);
      console.log(`videoId start: ${videoIdStart}`);
    })
    .then(() => {
      if (videoIdStart >= videoIdEnd) {
        console.log(`seeding process took ${new Date() - sessionStart}`);
        process.exit();
      } else {
        VideoHasTagAsync();
      }
    });
};

VideoHasTagAsync();

// test on using UNWIND

// params = {tags: ['avocado', 'stumptown', ...], videos: [10001, 10002, ...]}
// const unwindParams = () => {
//   const tagCount = makeRandomIndex(tagMax, tagMin);
//   const params = { tags: [] };
//   for (let j = 0; j < tagCount; j += 1) {
//     params.tags.push(demoTags[makeRandomIndex(demoTags.length)]);
//   }
//   return params;
// };

// const params = unwindParams();
// console.log(params);

// for (let i = videoIdStart; i < videoIdStart + videosPerBatch; i += 1) {
//   if (i === 0) {
//     singleBatch.push(`UNWIND $tags as tagW MATCH (v:Video), (t:Tag) WHERE id(v) = ${i} AND t.word = tagW create (v)-[:HAS_TAG]->(t) return t`);
//   } else {
//     singleBatch.push(`UNWIND $tags as tagW MATCH (v:Video), (t:Tag) WHERE id(v) = ${i} AND t.word = tagW create (v)-[:HAS_TAG]->(t)`);
//   }
// }

// const VideoHasTagAsync = () => {
//   console.log(singleBatch);
//   Promise.all(singleBatch.map(singleQuery => session.run(singleQuery, params)))
//     .then(() => {
//       console.log(`seeding process took ${new Date() - sessionStart}`);
//       process.exit();
//     })
//     .catch((err) => {
//       console.log(JSON.stringify(err));
//     });
// };

// VideoHasTagAsync();


// session.run('UNWIND $pairs as pair MATCH (v:Video), (t:Tag) WHERE id(v) = pair.videoId and t.word = pair.tagW create (v)-[:HAS_TAG]->(t)', params)
//   .then(res => console.log(JSON.stringify(res)))
//   .catch(err => console.log(JSON.stringify(err)));
