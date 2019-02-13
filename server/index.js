var express = require('express');

var parser = require('body-parser');

var request = require('request');

var app = express();

app.use(parser.json());

var PORT = 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Could not connect to server', err);
  } else {
    console.log('connected to server');
  }
});

app.get('/videos/:video_id', (req, res) => {

  var movie = req.body;
  var category = req.body.Categories[0];
  
});