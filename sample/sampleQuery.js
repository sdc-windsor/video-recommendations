// TASK:
// GET 10 videos in the same category and with one same tag as video id 10000

const videoId = 10000;
const videoCount = 10;
// ///////////////////// MYSQL //////////////////////////
const db = require('../db-mysql/db.js').devDB;

// SELECT tag_id FROM video_tag WHERE video_id = 10000 LIMIT 1
// 10ms

// SELECT author, thumbnailIndex, title FROM video
// WHERE category_id = (SELECT category_id from video WHERE id = 10000) LIMIT 10
// 10ms

// SELECT video.id, video.author, video.thumbnailIndex, video.plays, video.title, video_tag.tag_id
// FROM video
// INNER JOIN video_tag ON video.id = video_tag.video_id
// WHERE video.category_id = (SELECT category_id from video WHERE id = 10000)
// AND video_tag.tag_id = (SELECT tag_id FROM video_tag WHERE video_id = 10000 LIMIT 1)
// --- AND video.id < 1000000
// --- ORDER BY video.plays DESC
// LIMIT 10
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
// without order by plays: 30ms
// if order by plays: 19 sec


const sqlString = `SELECT video.id, video.author, video.thumbnailIndex, video.plays, video.title, video_tag.tag_id FROM video INNER JOIN video_tag ON video.id = video_tag.video_id WHERE video.category_id = (SELECT category_id from video WHERE id = ${videoId}) AND video_tag.tag_id = (SELECT tag_id FROM video_tag WHERE video_id = ${videoId} LIMIT 1) LIMIT ${videoCount}`;
const sqlArgs = [];

const start = new Date();
db.query(sqlString, sqlArgs, (err, res) => {
  if (err) {
    console.log(`Query MySQL error: ${err}`);
  } else {
    console.log(`MySQL query took ${new Date() - start} ms`);
    console.log(JSON.stringify(res));
    db.end();
  }
});

// ///////////////////// Neo4j //////////////////////////
