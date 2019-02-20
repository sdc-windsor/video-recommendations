var Movie = require('./index.js').Movie;
var data = require('./data.js');

Movie.remove({}, function(err) { 
  console.log('collection removed'); //empty the movie collection
});

data.createObject(data.urls, data.thumbnails)
  .then((results) => {
    Movie.insertMany(results)
      .then((results) => {
        console.log('saved in database');
      })
      .catch((err) => {
        console.log('there was an error saving into the database', err);
      }); 
  });
