var express = require('express');
var parser = require('body-parser');
var cors = require('cors');
var app = express();
var db = require('../database/index');

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

var PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Could not connect to server', err);
  } else {
    console.log('connected to server on port', PORT );
  }
});

app.get('/collections', (req, res) => {
  var randomnumber = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  res.json(randomnumber);
  res.end();
});


app.get('/featured/:category', (req, res) => {
  var category = req.params.category;
  
  db.findMoviesByCategory(category)
    .then((result) => {
      console.log('got results from server', result);
      res.send(result);
    })
    .catch((err) => {
      console.log('could no get results to server', err);
      res.status(404).send('Not found', err);
    });
});
