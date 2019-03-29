const express = require('express');
const path = require('path');
const parser = require('body-parser');
const { getRecVideos } = require('../db-mysql/db.js');

const app = express();

app.use('/:id', express.static(path.join(__dirname, '../client/dist')));
app.use(parser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/recommendations/:id', (req, res) => {
  const videoId = req.params.id;
  console.log(videoId);

  getRecVideos(videoId, (resultVideos) => {
    res.send(resultVideos);
  });
});

module.exports = app;
