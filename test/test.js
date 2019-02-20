var mocha = require('mocha');

var Movie = require('../database/index.js').Movie;

const request = require('supertest');

const mongoose = require('mongoose');


//Connect to MongoDB Here

var testMovie = new Movie({
  id: 2,
  url: 'test_url',
  thumbnail: 'test_thumbnail',
  category: 'test category',
  videoId: 4,
  title: 'test title',
  author: 'test author',
  plays: 3
});

mongoose.connect('mongodb://localhost/testdb')
  .then(() => {
    console.log('connected to db');
    testMovie.save((err) => {
      if (err) {
        console.log('there was an error', err);
      } else {
        console.log('saved it ');
      }
    });
    
  });







