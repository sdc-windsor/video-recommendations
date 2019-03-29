const db = require('./connection.js').devDB;

const getRecVideos = (videoId, callback) => {
  const videoCount = 10;
  const sqlString = `SELECT video.id, video.author, video.thumbnailIndex, video.plays, video.title, video_tag.tag_id FROM video INNER JOIN video_tag ON video.id = video_tag.video_id WHERE video.category_id = (SELECT category_id from video WHERE id = ${videoId}) AND video_tag.tag_id = (SELECT tag_id FROM video_tag WHERE video_id = ${videoId} LIMIT 1) LIMIT ${videoCount}`;
  const sqlArgs = [];
  const sqlt1 = new Date();

  db.query(sqlString, sqlArgs, (err, res) => {
    if (err) {
      console.log(`Query MySQL error: ${err}`);
    } else {
      console.log(`MySQL query took ${new Date() - sqlt1} ms`);
      callback(res);
    }
  });
};

module.exports = {
  getRecVideos,
};

// [{
// id: 4538,
// author: 'reneeaguilar',
// thumbnailIndex: 64,
// plays: 290,
// title: 'ocavore selfies marfa normcore bit',
// tag_id: 234 },
// {
// id: 5125,
// author: 'allanmoreno',
// thumbnailIndex: 78,
// plays: 552,
// title: 'r toast craft beer helvetica cold-',
// tag_id: 234 }]