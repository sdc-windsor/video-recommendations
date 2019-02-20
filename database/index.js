var mongoose = require('mongoose');
var data = require('./data.js');
mongoose.connect('mongodb://localhost/movies', { useNewUrlParser: true })

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
 
module.exports.Movie = Movie;

    

 
  


