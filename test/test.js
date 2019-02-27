var mocha = require('mocha');

const data = require('../database/data.js');

const chai = require('chai');

const expect = chai.expect;

const mongoose = require('mongoose');

var testModel = mongoose.model('testModel', new mongoose.Schema({
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
  mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true });
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
    data.createVideoList(data.urls, data.thumbnails)
      .then((results) => {
        return testModel.insertMany(results, (err) => {
          if (err) {
            console.log('There was an error when inserting the data', err);
          } else {
            console.log('documents inserted');
            done();
          }
        });
      });
  });
});


describe('seeding function', () => {
  it('should add 20 entries (movies) into database', (done) => {
    testModel.estimatedDocumentCount((err, res) => {
      if (err) {
        console.log('There was an error finding the estimated count', err);
      } else {
        expect(res).to.equal(20);
        done();
      }
    });
  });
        

  it('should save documents with 8 valid fields each', (done) => {
    
    testModel.find({ videoId: 1 }, (err, res) => {
      if (err) {
        console.log('did not find the video', err);
      } else {
        var foundEntry = res[0];
        expect(foundEntry.url).to.exist;
        expect(foundEntry.thumbnail).to.exist;
        expect(foundEntry.category).to.exist;
        expect(foundEntry.videoId).to.exist;
        expect(foundEntry.title).to.exist;
        expect(foundEntry.author).to.exist;
        expect(foundEntry.plays).to.exist;
        done();
      }
    });
  });
});
