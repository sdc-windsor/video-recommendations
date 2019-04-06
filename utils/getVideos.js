const $ = require('jquery');

const localPort = 3002;

const getVideos = (id, callback) => {
  $.ajax({
    url: `http://localhost:${localPort}/recommendations/${id}`,
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
    url: `http://localhost:${localPort}/graphql`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      query: `
      {
        getRecommendations(videoId:${id}) {
          id,
          author,
          title,
          thumbnail,
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


module.exports = {
  getVideos,
  getVideosGQL,
};
