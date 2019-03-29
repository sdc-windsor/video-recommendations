import React, { Component } from 'react';
import Axios from 'axios';
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
    let id = window.location.pathname;
    id === '/' ? id = 10000 : id = Number(id.split('/')[1]);
    this.changeVideo(id);
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
    // var urlCategory = 'http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com';
    const localUrl = 'http://localhost:3003';
    Axios.get(`${localUrl}/${id}`)
      .then((thumbnails) => {
        console.log(thumbnails);
        this.changeThumbnails(thumbnails);
      })
      .catch((err) => {
        // need to add 10 default thumbnail objects for error getting data
        console.log(`Error getting 10 more videos: ${err}`);
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
