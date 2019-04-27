import React from 'react';
import Video from './Video.jsx';

const VideoContainer = ({ thumbnails, changeVideo, imagePath }) => (
  <div id="videoContainer">
    {thumbnails.map(thumbnail => <Video key={thumbnail.id} thumbnail={thumbnail} changeVideo={changeVideo} imagePath={imagePath} />)}
  </div>
);

export default VideoContainer;
