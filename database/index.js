var mongoose = require('mongoose');
var data = require('./data.js');


mongoose.connect('mongodb://localhost/movies')
  .then(() => { console.log('connected to mongo db'); })
  .catch((err) => { console.log('error connecting to db', err); });

const movieSchema = new mongoose.Schema({
  id: Number,
  url: String,
  thumbnail: String,
  category: String,
  videoId: Number,
  title: String,
  author: String,
  plays: Number
});


const Movie = mongoose.model('Movie', movieSchema);
  
data.createObject(data.urls, data.thumbnails)
  .then((results) => {
    Movie.insertMany(results)
      .then((results) => {
        console.log('saved in database');
      })
      .catch((err) => {
        'there was an error saving into the database';
      }); 
  });

    

 
  


