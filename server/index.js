var express = require('express');

var rp = require('request-promise');

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

app.post('/videos/:video_id', (req, res) => {
  
  var movie = req.body;
  var category = req.body.Categories[0];
  console.log(category);
  request.get('https://6eac8a25-e35d-4ef9-857f-b4c542a041b5.mock.pstmn.io/demo', (err, results) => {
    if (err) {
      console.log('there was an error');
    } else {
      console.log('results are here', results.body);
      res.send(results.body);
    }
  });
  
});