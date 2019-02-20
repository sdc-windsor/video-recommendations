var Movie = require('./index.js').Movie;
var dataMovie = require('./data.js');


seedDatabase = function(collection, data) {
  collection.deleteMany({}, function(err) { 
    console.log('collection removed'); //empty the movie collection
  });
  
  data.createObject(data.urls, data.thumbnails)
    .then((results) => {
      collection.insertMany(results)
        .then((results) => {
          console.log('saved in database');
        })
        .catch((err) => {
          console.log('there was an error saving into the database', err);
        }); 
    });
};

seedDatabase(Movie, dataMovie);