import React, { Component } from 'react';
import Switch from './Switch.jsx';
import VideoContainer from './VideoContainer.jsx';
import Button from './Button.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.changeThumbnails = this.changeThumbnails.bind(this);
    this.addThumbnails = this.addThumbnails.bind(this);
    this.changeVideo = this.changeVideo.bind(this);

    this.state = {
      thumbnails: [],
    };
    this.thumbnails;
    this.initial = 0;
  }

  componentDidMount() {
    const path = window.location.pathname.split('/')[1];
    let id;
    path === '' ? id = 10000 : id = path;
    this.props.getVideos(id, (res) => {
      this.setState({
        thumbnails: res,
      });
    });
  }

  changeThumbnails(inputThumbnails) {
    this.setState({
      thumbnails: inputThumbnails,
    });
  }

  addThumbnails() {
    this.initial = this.initial + 10;
    const additionalThumbnails = this.thumbnails.slice(0, this.initial);
    this.setState({
      thumbnails: additionalThumbnails,
    });
  }

  changeVideo(id) {
    this.props.getVideos(id, (res) => {
      this.setState({
        thumbnails: res,
      });
    });
  }

  render() {
    const { thumbnails } = this.state;

    return (
      <div id="masterContainer">
        <div className="sidenav">
          <h4 id="title">Related Videos</h4>
          <Switch />
          <VideoContainer thumbnails={thumbnails} changeVideo={this.changeVideo} />
          <div className="buttonContainer">
            <Button addThumbnails={this.addThumbnails} />
          </div>
        </div>
      </div>
    );
  }
}
