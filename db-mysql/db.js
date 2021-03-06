const Promise = require('bluebird');
const db = require('./connection.js').devDB;

// for Express API
const getRecVideos = (videoId, callback) => {
  console.log(videoId);
  const videoCount = 30;
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

// for Apollo-GraphQL
const getRecVideosAsync = (videoId, imagePath) => {
  const videoCount = 30;
  const sqlString = `SELECT video.id, video.author, video.thumbnailIndex, video.plays, video.title, video_tag.tag_id FROM video INNER JOIN video_tag ON video.id = video_tag.video_id WHERE video.category_id = (SELECT category_id from video WHERE id = ${videoId}) AND video_tag.tag_id = (SELECT tag_id FROM video_tag WHERE video_id = ${videoId} LIMIT 1) LIMIT ${videoCount}`;
  const sqlArgs = [];
  const sqlt2 = new Date();

  return new Promise((resolve, reject) => {
    db.query(sqlString, sqlArgs, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`MySQL query took ${new Date() - sqlt2} ms`);
        res.forEach((video) => { video.thumbnail = `${imagePath}/${video.thumbnailIndex}.jpg`; });
        resolve(res);
      }
    });
  });
};

module.exports = {
  getRecVideos,
  getRecVideosAsync,
};
