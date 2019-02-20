var mocha = require('mocha');

// var db = require('../database/index.js');
const data = require('../database/data.js');

const chai = require('chai');

const expect = chai.expect;

const mongoose = require('mongoose');

//Connect to MongoDB Here

var testModel = mongoose.model('testModel', new mongoose.Schema({
  id: Number,
  url: String,
  thumbnail: String,
  category: String,
  videoId: Number,
  title: String,
  author: String,
  plays: Number
})); 

before(function (done) {
  //Connect to MongoDB Here
  mongoose.connect('mongodb://localhost/testdb');
  mongoose.connection.once('open', function () {
    console.log('Connected to MongoDB!');
    done();
  }).on('error', function () {
    console.log('Connection error : ', error);
  });
});
 
beforeEach(function (done) {
  testModel.deleteMany({}, (err) => {
    if (err) {
      console.log('there was an error', err);
    }
    done();
  });
});


describe('seeding function', () => {
  it('should add 20 entries (movies) into database', (done) => {
    
    data.createObject(data.urls, data.thumbnails)
      .then((results) => {
        return testModel.insertMany(results, (err) => {
          if (err) {
            console.log('There was an error when inserting the data', err);
          } else {
            testModel.estimatedDocumentCount((err, res) => {
              if (err) {
                console.log('There was an error finding the estimated count', err);
              } else {
                expect(res).to.equal(20);
                done();
              }
            });
          }
        });
      })
      .catch((err) => {
        console.log(('there was an error saving into testdb', err));
      }); 
  });
});