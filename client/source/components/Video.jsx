import React, { Component } from 'react';

export default class Video extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var randomId = Math.floor(Math.random() * 100);
    return (
      <div>
        { this.props.thumbnails.map((ele, ind) => {
          return <div className="thumbnailContainer">
            <div className="imageContainer" onClick = {() => { this.props.changeVideo(randomId); }} >
              {ind === 0 ? <img className="firstItem thumbnailsImage" key = {ind} src={ele.thumbnail}/> :
                <img key = {ind} className="thumbnailsImage" src={ele.thumbnail}/>
              }
            </div>
            <div className="videoTextContainer">
              <div className="videoName">{ele.title}</div>
              <div className="videoAuthor">{ele.author}</div>
            </div>
          </div>;
        })}
      </div>
    );
  }
}
