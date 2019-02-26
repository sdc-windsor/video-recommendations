import React, { Component } from 'react';

export default class Video extends Component {

  constructor(props) {
    super(props);
    this.thumbnails = [

      'https://i.vimeocdn.com/video/758010149_130x73.jpg',
      'https://i.vimeocdn.com/video/754371849_130x73.jpg',
      'https://i.vimeocdn.com/video/510151555_130x73.jpg',
      'https://i.vimeocdn.com/video/758267720_130x73.jpg',
      'https://i.vimeocdn.com/video/759364462_130x73.jpg',
      'https://i.vimeocdn.com/video/757997676_130x73.jpg',
      'https://i.vimeocdn.com/video/607544099_130x73.jpg',
      'https://i.vimeocdn.com/video/604072245_130x73.jpg',
      'https://i.vimeocdn.com/video/600730574_130x73.jpg',
      'https://i.vimeocdn.com/video/601784088_130x73.jpg',
      'https://i.vimeocdn.com/video/756003803_130x73.jpg',
      'https://i.vimeocdn.com/video/756667068_130x73.jpg',
      'https://i.vimeocdn.com/video/660657659_130x73.jpg',
      'https://i.vimeocdn.com/video/583307046_130x73.jpg',
      'https://i.vimeocdn.com/video/524568939_130x73.jpg',
      'https://i.vimeocdn.com/video/757201041_130x73.jpg',
      'https://i.vimeocdn.com/video/607736941_130x73.jpg',
      'https://i.vimeocdn.com/video/603802213_130x73.jpg',
      'https://i.vimeocdn.com/video/593139166_130x73.jpg',
      'https://i.vimeocdn.com/video/600031226_130x73.jpg'
    ];
  }

  render() {

    return (
      <div>
        {this.thumbnails.map((ele, ind) => {
          return <div className="thumbnailContainer">
            {ind === 0 ? <img className="firstItem thumbnailsImage" key = {ind} src={ele}/> : 
              <img key = {ind} className="thumbnailsImage" src={ele}/>
            }
            <div className="videoTextContainer">
              <div className="videoName">Video Title</div>
              <div className="videoAuthor">Video Author</div>
            </div>
          </div>;
        })}        
      </div>
    );
  }
}
