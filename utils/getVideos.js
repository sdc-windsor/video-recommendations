const $ = require('jquery');

const defaultVideo = {
  author: 'Hack Reactor',
  title: 'How the Internet Works',
  thumbnail: 'https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images/1.jpg',
};

const defaultVideos = [];
for (let i = 0; i < 10; i + 1) {
  defaultVideos.push(defaultVideo);
}

console.log(defaultVideos);

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
      const videos = response.data.getRecommendations;
      console.log(videos);
      if (videos.length < 10) {
        callback(videos.concat(defaultVideos.slice(0, 10 - videos.length)));
      } else {
        callback(response.data.getRecommendations);
      }
    })
    .fail(() => {
      console.log('fail to get data from graphql');
      // send back 10 default videos
      callback(defaultVideos);
    });
};


module.exports = {
  getVideos,
  getVideosGQL,
};
