const $ = require('jquery');

const PROD_URL_ORI = require('../EC2.js').SERVICE_PROD_URL_ORI;
const PROD_URL_DUP = require('../EC2.js').SERVICE_PROD_URL_DUP;

const DEV_URL = '127.0.0.1:3002';

// for Apollo-Graphql server
const getVideosGQL = (id, callback) => {
  console.log(id);
  $.ajax({
    url: `http://${DEV_URL}/graphql`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      query: `
      {
        getRecommendations(videoId:${id}) {
          id,
          author,
          title,
          thumbnailIndex,
          plays
        }
      }
    `,
    }),
  })
    .done((response) => {
      const videos = response.data.getRecommendations;
      console.log(videos);
      callback(videos);
    })
    .fail(() => {
      console.log('fail to get data from graphql');
    });
};

// for Express server
const getVideos = (id, callback) => {
  $.ajax({
    url: `/recommendations/${id}`,
    type: 'GET',
    contentType: 'application/json',
  })
    .done((data) => {
      console.log(data);
      callback(data);
    })
    .fail(() => {
      console.log('fail to get /recommendations/:id');
    });
};

module.exports = {
  getVideos,
  getVideosGQL,
};
