const $ = require('jquery');

const getVideos = (id, callback) => {
  $.ajax({
    url: `http://localhost:3002/recommendations/${id}`,
    type: 'GET',
    contentType: 'application/json',
  })
    .done((data) => {
      callback(data);
    })
    .fail(() => {
      console.log('fail to get /recommendations/:id');
      // send back default data
      // callback(defaultVideos)
    });
};

module.exports = {
  getVideos,
};
