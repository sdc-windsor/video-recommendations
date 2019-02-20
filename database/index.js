var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies', { useNewUrlParser: true });

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
module.exports.movieSchema = movieSchema;

    

 
  


