var faker = require('faker');

var urls = [
  [316074337, 'animation'], [313129016, 'animation'],
  [119921705, 'comedy'], [316287761, 'comedy'],
  [168909375, 'music'], [314265110, 'music'],
  [195304295, 'arts & design'], [192646839, 'arts & design'],
  [190163610, 'food'], [190944549, 'food'],
  [292071219, 'documentary'], [315958054, 'documentary'],
  [190547753, 'fashion'], [178383565, 'fashion'],
  [132038125, 'travel'], [314999584, 'travel'],
  [195306938, 'journalism'], [186141191, 'journalism'],
  [183896385, 'education'], [189642668, 'education']

];

var thumbnails = [

  "https://i.vimeocdn.com/video/758010149_130x73.jpg",
  "https://i.vimeocdn.com/video/754371849_130x73.jpg",
  "https://i.vimeocdn.com/video/510151555_130x73.jpg",
  "https://i.vimeocdn.com/video/758267720_130x73.jpg",
  "https://i.vimeocdn.com/video/759364462_130x73.jpg",
  "https://i.vimeocdn.com/video/757997676_130x73.jpg",
  "https://i.vimeocdn.com/video/607544099_130x73.jpg",
  "https://i.vimeocdn.com/video/604072245_130x73.jpg",
  "https://i.vimeocdn.com/video/600730574_130x73.jpg",
  "https://i.vimeocdn.com/video/601784088_130x73.jpg",
  "https://i.vimeocdn.com/video/756003803_130x73.jpg",
  "https://i.vimeocdn.com/video/756667068_130x73.jpg",
  "https://i.vimeocdn.com/video/660657659_130x73.jpg",
  "https://i.vimeocdn.com/video/583307046_130x73.jpg",
  "https://i.vimeocdn.com/video/524568939_130x73.jpg",
  "https://i.vimeocdn.com/video/757201041_130x73.jpg",
  "https://i.vimeocdn.com/video/607736941_130x73.jpg",
  "https://i.vimeocdn.com/video/603802213_130x73.jpg",
  "https://i.vimeocdn.com/video/593139166_130x73.jpg",
  "https://i.vimeocdn.com/video/600031226_130x73.jpg"
]

async function createObject(arr1, arr2) {
  var objs = []

  for (let i = 0; i <=19; i++) {
    var url = `https://player.vimeo.com/video/${arr1[i][0]}/`;
    var category = arr1[i][1];
    var thumbnail = arr2[i];
    var videoId = i + 1;
    var author = await faker.name.findName();
    var title = await faker.lorem.words();
    var plays = await faker.random.number();

    var obj = {
      url,
      category,
      thumbnail,
      videoId,
      title,
      author,
      plays
    }
    objs.push(obj);
  }
  console.log(objs)
  return objs;
}

module.exports.thumbnails = thumbnails;
module.exports.urls = urls;
module.exports.createObject = createObject;