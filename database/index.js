var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies', { useNewUrlParser: true });

const movieSchema = new mongoose.Schema({
  url: String,
  thumbnail: String,
  category: String,
  videoId: Number,
  title: String,
  author: String,
  plays: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
  Movie,
  movieSchema
};
    

 
  


