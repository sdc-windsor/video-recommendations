var mocha = require('mocha');

var chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../server/index.js');

chai.use(chaiHttp);

var should = chai.should();


describe('POST', () => {
  it('it should receive an object', (done) => {
    chai.request(server)
      .post('/videos/:video_id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.Categories.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });
});