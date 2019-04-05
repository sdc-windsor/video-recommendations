const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const url = 'http://localhost:3002';
const id = 100100;
const word = 'kombucha';

describe('Apollo GraphQL CRUD', () => {
  describe('getRecommendations', () => {
    const getQuery = JSON.stringify({
      query: `
      {
        getRecommendations(videoId:${id}) {
          id,
          author,
          title,
          thumbnail,
        }
      }
    `,
    });

    it('should get 100 videos', (done) => {
      chai.request(url)
        .post('/graphql')
        .type('application/json')
        .send(getQuery)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data.getRecommendations).to.have.lengthOf(100);
          done();
        });
    });

    it('should return correct properties', (done) => {
      chai.request(url)
        .post('/graphql')
        .type('application/json')
        .send(getQuery)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.data.getRecommendations[10].id).to.be.a('number');
          expect(res.body.data.getRecommendations[20].title).to.be.a('string');
          expect(res.body.data.getRecommendations[30].author).to.be.a('string');
          expect(res.body.data.getRecommendations[40].thumbnail).to.be.a('string');
          expect(res.body.data.getRecommendations[40].plays).to.be.undefined;
          done();
        });
    });
  });

  describe('addTag', () => {
    const addQuery = JSON.stringify({
      query: `
      {
        addTag(videoId:${id}, tagWord:"${word}") {
          word
        }
      }
    `,
    });

    it('should return the tag word', (done) => {
      chai.request(url)
        .post('/graphql')
        .type('application/json')
        .send(addQuery)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data.addTag.word).to.equal(word);
          done();
        });
    });
  });

  describe('updatePlays', () => {
    const updateQuery = JSON.stringify({
      query: `
      {
        updatePlays(videoId:${id}) {
          author,
          title,
          plays,
        }
      }
    `,
    });

    let previousPlayCount;

    it('should return a video object', (done) => {
      chai.request(url)
        .post('/graphql')
        .type('application/json')
        .send(updateQuery)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data.updatePlays.author).to.be.a('string');
          expect(res.body.data.updatePlays.title).to.be.a('string');
          expect(res.body.data.updatePlays.plays).to.be.a('number');
          previousPlayCount = res.body.data.updatePlays.plays;
          done();
        });
    });


    it('should increase play count by 1', (done) => {
      chai.request(url)
        .post('/graphql')
        .type('application/json')
        .send(updateQuery)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data.updatePlays.plays).to.equal(previousPlayCount + 1);
          done();
        });
    });
  });

  describe('removeTag', () => {
    const removeQuery = JSON.stringify({
      query: `
      {
        removeTag(videoId:${id}, tagWord:"${word}") {
          word
        }
      }
    `,
    });

    it('should return the tag word', (done) => {
      chai.request(url)
        .post('/graphql')
        .type('application/json')
        .send(removeQuery)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data.removeTag.word).to.equal(word);
          done();
        });
    });
  });
});
