import React, { Component } from 'react';
import Switch from './Switch.jsx';
import VideoContainer from './VideoContainer.jsx';
import Button from './Button.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addThumbnails = this.addThumbnails.bind(this);
    this.changeVideo = this.changeVideo.bind(this);

    this.state = {
      currentId: 9999999,
      allThumbnails: [],
      displayThumbnails: [],
      imagePath: this.props.imagePath,
    };
  }

  componentDidMount() {
    const { currentId } = this.state;
    const pathId = window.location.pathname.split('/')[1];
    const id = pathId === '' ? currentId : pathId;
    this.changeVideo(id);
  }

  addThumbnails() {
    const { displayThumbnails, allThumbnails } = this.state;
    const displayCount = displayThumbnails.length;
    const newDisplay = displayThumbnails.concat(allThumbnails.slice(displayCount, displayCount + 10));
    this.setState({
      displayThumbnails: newDisplay,
    });
  }

  changeVideo(id) {
    this.props.getVideos(id, (res) => {
      this.setState({
        currentId: id,
        allThumbnails: res,
        displayThumbnails: res.slice(0, 10),
      });
    });
  }

  render() {
    const { displayThumbnails, imagePath } = this.state;

    return (
      <div id="masterContainer">
        <div className="sidenav">
          <h4 id="title">Related Videos</h4>
          <Switch />
          <VideoContainer thumbnails={displayThumbnails} changeVideo={this.changeVideo} imagePath={imagePath} />
          { displayThumbnails.length < 100
            && (
            <div className="buttonContainer">
              <Button addThumbnails={this.addThumbnails} />
            </div>
            )
          }
        </div>
      </div>
    );
  }
}
