import React from 'react';

const Video = ({ thumbnail, changeVideo }) => (
  <div className="thumbnailContainer">
    <div className="imageContainer" onClick={() => { changeVideo(thumbnail.id); }}>
      <img className="thumbnailsImage" src={thumbnail.thumbnail} />
    </div>
    <div className="videoTextContainer">
      <div className="videoName">{thumbnail.title}</div>
      <div className="videoAuthor">{thumbnail.author}</div>
    </div>
  </div>
);

export default Video;
