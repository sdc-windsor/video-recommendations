import React from 'react';

const Video = ({ thumbnails, changeVideo }) => (
  <div>
    { thumbnails.map((ele, ind) => (
      <div className="thumbnailContainer">
        <div className="imageContainer" onClick={() => { changeVideo(Math.floor(Math.random() * 100)); }}>
          {ind === 0 ? <img className="firstItem thumbnailsImage" key={ind} src={ele.thumbnail} />
            : <img key={ind} className="thumbnailsImage" src={ele.thumbnail} />
              }
        </div>
        <div className="videoTextContainer">
          <div className="videoName">{ele.title}</div>
          <div className="videoAuthor">{ele.author}</div>
        </div>
      </div>
    ))}
  </div>
);

export default Video;
