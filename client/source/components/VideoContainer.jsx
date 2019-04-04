import React from 'react';
import Video from './Video.jsx';

const VideoContainer = ({ thumbnails, changeVideo }) => (
  <div id="videoContainer">
    {thumbnails.map(thumbnail => <Video thumbnail={thumbnail} changeVideo={changeVideo} />)}
  </div>
);

export default VideoContainer;
