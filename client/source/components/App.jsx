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
      allThumbnails: [],
      displayThumbnails: [],
    };
  }

  componentDidMount() {
    const path = window.location.pathname.split('/')[1];
    let id;
    path === '' ? id = 10000 : id = path;
    this.props.getVideos(id, (res) => {
      this.setState({
        allThumbnails: res,
        displayThumbnails: res.slice(0, 10),
      });
    });
  }

  changeThumbnails(inputThumbnails) {
    this.setState({
      thumbnails: inputThumbnails,
    });
  }

  addThumbnails() {
    const displayCount = this.state.displayThumbnails.length;
    const newDisplay = this.state.displayThumbnails.concat(this.state.allThumbnails.slice(displayCount, displayCount + 10));
    this.setState({
      displayThumbnails: newDisplay,
    });
  }

  changeVideo(id) {
    this.props.getVideos(id, (res) => {
      this.setState({
        allThumbnails: res,
        displayThumbnails: res.slice(0, 10),
      });
    });
  }

  render() {
    const { displayThumbnails } = this.state;

    return (
      <div id="masterContainer">
        <div className="sidenav">
          <h4 id="title">Related Videos</h4>
          <Switch />
          <VideoContainer thumbnails={displayThumbnails} changeVideo={this.changeVideo} />
          { displayThumbnails.length < 100 &&
            <div className="buttonContainer">
              <Button addThumbnails={this.addThumbnails} />
            </div>
          }
        </div>
      </div>
    );
  }
}
