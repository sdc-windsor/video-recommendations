// TASK:
// 1) GET 10 videos in the same category and with one same tag as video id 10000
// 2) GET 10 videos in the same category as video id 10000

// OUTCOME:
// +-------+---------------+----------------+-------+-------------------------------------+--------+
// | id    | author        | thumbnailIndex | plays | title                               | tag_id |
// +-------+---------------+----------------+-------+-------------------------------------+--------+
// |  1513 | dannycarr     |             14 |  1594 | ato iPhone                          |    210 |
// |  1802 | Douglas       |             30 |  8569 | ock XOXO, jianbing hoo              |    210 |
// |  2360 | Glover        |             14 |  8831 | bottle vaporware post-ironic organi |    210 |
// |  2730 | Peter         |             33 |  6298 | tainable direct                     |    210 |
// |  3100 | jennydunn     |             14 |  3728 | yl you probably havent heard o      |    210 |
// |  4910 | jarrodestrada |             46 |  4159 | re migas skat                       |    210 |
// |  5035 | Payne         |             43 |  7666 | pok flannel fanny pack. Lomo hammoc |    210 |
// |  8745 | dannycarr     |             77 |  8544 | rs pug retro. Portland key          |    210 |
// | 10000 | Rojas         |             74 |  4565 | le taiyaki tacos p                  |    210 |
// | 10067 | Norris        |             28 |  4075 | ard. Pour-over farm-to-table        |    210 |
// +-------+---------------+----------------+-------+-------------------------------------+--------+

// SCRIPT
const videoId = 10000;
const videoCount = 10;

// ///////////////////// MYSQL //////////////////////////
// SELECT video.id, video.author, video.thumbnailIndex, video.plays, video.title, video_tag.tag_id
// FROM video
// INNER JOIN video_tag ON video.id = video_tag.video_id
// WHERE video.category_id = (SELECT category_id from video WHERE id = 10000)
// AND video_tag.tag_id = (SELECT tag_id FROM video_tag WHERE video_id = 10000 LIMIT 1)
// -- AND video.id < 1000000
// -- ORDER BY video.plays DESC
// LIMIT 10
// without order by plays: 30ms
// if order by plays: 19 sec

const db = require('../db-mysql/db.js').devDB;

const sqlArgs = [];

// ///////////////////// MYSQL TASK 1 //////////////////////////
const sqlString = `SELECT video.id, video.author, video.thumbnailIndex, video.plays, video.title, video_tag.tag_id FROM video INNER JOIN video_tag ON video.id = video_tag.video_id WHERE video.category_id = (SELECT category_id from video WHERE id = ${videoId}) AND video_tag.tag_id = (SELECT tag_id FROM video_tag WHERE video_id = ${videoId} LIMIT 1) LIMIT ${videoCount}`;
const sqlt1 = new Date();

db.query(sqlString, sqlArgs, (err, res) => {
  if (err) {
    console.log(`Query MySQL error: ${err}`);
  } else {
    console.log(`MySQL query took ${new Date() - sqlt1} ms`);
    console.log(JSON.stringify(res));
    process.exit();
  }
});

// ///////////////////// MYSQL TASK 2 //////////////////////////
const sqlStringSimple = `SELECT author, thumbnailIndex, title FROM video WHERE category_id = (SELECT category_id from video WHERE id = ${videoId}) LIMIT ${videoCount}`;
const sqlt2 = new Date();

db.query(sqlStringSimple, sqlArgs, (err, res) => {
  if (err) {
    console.log(`Query MySQL error: ${err}`);
  } else {
    console.log(`MySQL query took ${new Date() - sqlt2} ms`);
    console.log(JSON.stringify(res));
    process.exit();
  }
});

// // ///////////////////// MYSQL TASK 3 //////////////////////////
const sqlStringOrderBy = `SELECT video.id, video.author, video.thumbnailIndex, video.plays, video.title, video_tag.tag_id FROM video INNER JOIN video_tag ON video.id = video_tag.video_id WHERE video.category_id = (SELECT category_id from video WHERE id = ${videoId}) AND video_tag.tag_id = (SELECT tag_id FROM video_tag WHERE video_id = ${videoId} LIMIT 1) AND video.id < 1000000 ORDER BY video.plays DESC LIMIT ${videoCount}`;
const sqlt3 = new Date();

db.query(sqlStringOrderBy, sqlArgs, (err, res) => {
  if (err) {
    console.log(`Query MySQL error: ${err}`);
  } else {
    console.log(`MySQL query took ${new Date() - sqlt3} ms`);
    console.log(JSON.stringify(res));
    process.exit();
  }
});


// // ///////////////////// Neo4j //////////////////////////

// // //////// USING HTTP
const { cypherMulti } = require('../db-neo4j/db.js');
// // ///////////////////// Neo4j TASK 1//////////////////////////
const neo4jQuery = `MATCH (v:Video)-[:HAS_TAG]->(t:Tag)<-[:HAS_TAG]-(r:Video)-[:BELONGS_TO]->(c:Category)<-[:BELONGS_TO]-(v:Video) WHERE id(v) = ${videoId} RETURN r LIMIT ${videoCount}`;
const statementsArray = [{ statement: neo4jQuery, parameters: null }];
const neot1 = new Date();

cypherMulti(statementsArray, (err, res) => {
  if (err) {
    console.log(`Query Neo4j error: ${err}`);
  } else {
    console.log(`Neo4j query took ${new Date() - neot1} ms`);
    console.log(JSON.stringify(res));
    process.exit();
  }
});

// // ///////////////////// Neo4j TASK 2//////////////////////////
const neo4jQuerySimple = `MATCH (r:Video)-[:BELONGS_TO]->(c:Category)<-[:BELONGS_TO]-(v:Video) WHERE id(v) = ${videoId} RETURN r LIMIT ${videoCount}`;
const statementsArraySimple = [{ statement: neo4jQuerySimple, parameters: null }];
const neot2 = new Date();

cypherMulti(statementsArraySimple, (err, res) => {
  if (err) {
    console.log(`Query Neo4j error: ${err}`);
  } else {
    console.log(`Neo4j query took ${new Date() - neot2} ms`);
    console.log(JSON.stringify(res));
    process.exit();
  }
});

// // ///////////////////// Neo4j TASK 3//////////////////////////
const neo4jQueryOrderBy = `MATCH (r:Video)-[:BELONGS_TO]->(c:Category)<-[:BELONGS_TO]-(v:Video) WHERE id(v) = ${videoId} AND id(r) < 1000000 RETURN r ORDER BY r.plays DESC LIMIT ${videoCount}`;
const statementsArrayOrderBy = [{ statement: neo4jQueryOrderBy, parameters: null }];
const neot3 = new Date();

cypherMulti(statementsArrayOrderBy, (err, res) => {
  if (err) {
    console.log(`Query Neo4j error: ${err}`);
  } else {
    console.log(`Neo4j query took ${new Date() - neot3} ms`);
    console.log(JSON.stringify(res));
    process.exit();
  }
});

// //////// USING DRIVER --> slower than HTTP /////////////
// const { session } = require('../db-neo4j/db.js');
// session.run(neo4jQuery)
//   .then((res) => {
//     console.log(`Neo4j query took ${new Date() - start} ms`);
//     console.log(JSON.stringify(res));
//   })
//   .catch((err) => {
//     console.log(`Query Neo4j error: ${err}`);
//   });
