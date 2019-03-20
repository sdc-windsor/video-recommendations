import React from 'react';
import Video from './Video.jsx';

const VideoContainer = ({ thumbnails, changeVideo }) => (
  <div id="videoContainer">
    <Video thumbnails={thumbnails} changeVideo={changeVideo} />
  </div>
);

export default VideoContainer;
