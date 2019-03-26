const { demoTags } = require('../sample/ipsum.js');
const { session } = require('../db-neo4j/db.js');
const makeRandomIndex = require('../utils/genRandomIndex');
const { makeVideoHasTagString } = require('../utils/genNeo4jQuery');

// this script CREATEs Video HAS_TAG relationship
// MATCH (v:Video), (t:Tag) where id(v) = 1000 and t.word = 'stumptown' create (v)-[:HAS_TAG]->(t)

// Video node id starts at 255
let videoIdStart = 63859;
const videoIdEnd = 10000604;
const videosPerBatch = 20000;
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

  return Promise.all(singleBatch.map(singleQuery => session.run(singleQuery)))
    .then(() => {
      while (singleBatch.length > 0) {
        singleBatch.pop();
      }
    })
    .then(() => {
      videoIdStart += videosPerBatch;
      console.log(videoIdStart);
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
