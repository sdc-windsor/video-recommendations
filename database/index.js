var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://philxavier:secreta1@cluster0-9iu0m.mongodb.net/fec-database?retryWrites=true', { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('there was an error', err);
      
  } else {
    console.log('connected');
  }
    
});

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

let findMoviesByCategory = (inputCategory) => {
  inputCategory = inputCategory.toLowerCase();
  var query = {category: inputCategory};
  return new Promise((resolve, reject) => {
    Movie.find(query, (err, res) => {
      if (err) {
        console.log('there was an error retrieving from db', err);
        reject(err);
      } else {
        console.log('found results in db', res);
        resolve(res);
      }
    });
  });
};


module.exports = {
  Movie,
  movieSchema,
  findMoviesByCategory
};
    

 
  


