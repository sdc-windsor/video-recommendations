const express = require('express');
const path = require('path');
const parser = require('body-parser');
// const { getRecVideos } = require('../db-mysql/db.js');
const { getRecVideos } = require('../db-neo4j/db.js');

const app = express();

app.use('/:id', express.static(path.join(__dirname, '../client/dist')));
app.use(parser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const localImagePath = '../../sample/images';
const s3ImagePath = 'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images';

app.get('/recommendations/:id', (req, res) => {
  const videoId = req.params.id;

  getRecVideos(videoId, (resultVideos) => {
    resultVideos.forEach((video) => {
      video.thumbnail = `${s3ImagePath}/${video.thumbnailIndex}.jpg`;
    });
    res.send(resultVideos);
  });
});

module.exports = app;
