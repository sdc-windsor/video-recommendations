const addImagePath = (array, imagePath) => {
  array.forEach(video => Object.assign(video, { thumbnail: `${imagePath}/${video.thumbnailIndex}.jpg` }));
  return array;
};

module.exports = addImagePath;
