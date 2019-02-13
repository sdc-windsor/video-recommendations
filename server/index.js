var express = require('express');

var app = express();

var PORT = 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Could not connect to server', err);
  } else {
    console.log('connected to server');
  }
});

app.get('/', (req, res) => {
  res.send('hit the server');
});