import React from 'react';

const Video = ({ thumbnail, changeVideo, imagePath }) => (
  <div className="thumbnailContainer">
    <div className="imageContainer" onClick={() => { changeVideo(thumbnail.id); }}>
      <img className="thumbnailsImage" src={`${imagePath}/${thumbnail.thumbnailIndex}.jpg`} />
    </div>
    <div>
      <div className="videoName">{thumbnail.title}</div>
      <div className="videoAuthor">{thumbnail.author} ∙ {(thumbnail.plays / 1000).toFixed(1)}K views</div>
    </div>
  </div>
);

export default Video;
