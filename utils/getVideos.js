const $ = require('jquery');

const getVideos = (id, callback) => {
  $.ajax({
    url: `http://localhost:3002/recommendations/${id}`,
    type: 'GET',
    contentType: 'application/json',
  })
    .done((data) => {
      console.log(data);
      callback(data);
    })
    .fail(() => {
      console.log('fail to get /recommendations/:id');
      // send back default data
      // callback(defaultVideos)
    });
};

const getVideosGQL = (id, callback) => {
  $.ajax({
    url: 'http://localhost:3002/graphql',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      query: `
      {
        getRecommendations(videoId:${id}) {
          author,
          title,
          thumbnail,
        }
      }
    `,
    }),
  })
    .done((response) => {
      console.log(response.data.getRecommendations);
      callback(response.data.getRecommendations);
    })
    .fail(() => {
      console.log('fail to get data from graphql');
      // send back default data
      // callback(defaultVideos)
    });
};


module.exports = {
  getVideos,
  getVideosGQL,
};
