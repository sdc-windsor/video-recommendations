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
      allThumbnails: {},
      displayThumbnails: [],
    };
  }

  componentDidMount() {
    const { currentId } = this.state;
    const pathId = window.location.pathname.split('/')[1];
    const id = pathId === '' ? currentId : pathId;
    this.changeVideo(id);
  }

  addThumbnails() {
    const { displayThumbnails, allThumbnails, currentId } = this.state;
    const displayCount = displayThumbnails.length;
    const newDisplay = displayThumbnails.concat(allThumbnails[currentId].slice(displayCount, displayCount + 10));
    this.setState({
      displayThumbnails: newDisplay,
    });
  }

  changeVideo(id) {
    const { allThumbnails } = this.state;
    if (allThumbnails[id]) {
      this.setState({
        currentId: id,
        displayThumbnails: allThumbnails[id].slice(0, 10),
      });
    } else {
      this.props.getVideos(id, (res) => {
        const cache = allThumbnails;
        this.setState({
          currentId: id,
          allThumbnails: Object.assign({}, cache, { [id]: res }),
          displayThumbnails: res.slice(0, 10),
        });
      });
    }
  }

  render() {
    const { displayThumbnails } = this.state;

    return (
      <div id="masterContainer">
        <div className="sidenav">
          <h4 id="title">Related Videos</h4>
          <Switch />
          <VideoContainer thumbnails={displayThumbnails} changeVideo={this.changeVideo} />
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
