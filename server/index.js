var express = require('express');

var parser = require('body-parser');

var axios = require('axios')

var rp = require('request-promise');
 
var request = require('request');

var app = express();

app.use(parser.json());

var PORT = 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Could not connect to server', err);
  } else {
    console.log('connected to server on port', PORT );
  }
});

app.post('/videos/:video_id', (req, res) => {

  var category = req.params.Categories[0];
  
  rp.get(`/videosByCategory/${category}`)

    .then((results) => {

      //AT THIS POINT, RESULTS SHOULD LOOK LIKE
      //[
      // 	{
      // 		Video_id: 0012,
      // 		Description: ‘This is a description for video 0012’,
      // 	  Categories: [ ‘Animation’, ‘jazz’, ‘funny’]
      //  },
      //  {
      // 		Video_id: 0011,
      // 		Description: ‘This is a description for video 0011’,
      // 	  Categories: [ ‘Animation’, funny]
      //   },
      //  {
      // 		Video_id: 0002,
      // 		Description: ‘This is a description for video 0002’,
      // 	  Categories: [ Animation]
      //  },
      //]

      rp.get(`/thumbnails/12,11,2`)
      })
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log('there was an error', err)
      })
})


