import React, { Component } from 'react';
import Video from './Video.jsx';

export default class VideoContainer extends Component {
  render() {
    let {thumbnails, changeVideo} = this.props;
    return (
      <div id="videoContainer">
        <Video thumbnails = {thumbnails} changeVideo = {changeVideo} />
      </div>
    );
  }
}

