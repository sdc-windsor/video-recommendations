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
    id === '/' ? id = 1 : id = Number(id.split('/')[1]);
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
    //
    // var urlCategory = 'http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com';
    const urlCategory = 'http://localhost:3003';
    Axios.get(`${urlCategory}/categories/${id}`)

      .then((data) => {
        const targetCategory = data.data.categories[0];
        // var urlVideoByCategory = 'http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com';
        const urlVideoByCategory = 'http://localhost:3003';
        Axios.get(`${urlVideoByCategory}/videosByCategory/${targetCategory}`)

          .then((videosByCategory) => {
            console.log('here are the videos', videosByCategory );
            var ids = videosByCategory.data.map((ele) => {
              return ele.video_id;
            });
            var params = ids.join('%2C');
            const url = 'http://localhost:3001';
            Axios.get(`${url}/thumbnails/${params}`)

              .then((thumbnailsFromOther) => {
                console.log('here are the thumbnails=============', thumbnailsFromOther);
                const myUrl = 'http://localhost:3002';
                Axios.get(`${myUrl}/featured/${targetCategory}`)

                  .then((thumbnailsFromDb) => {
                    console.log('these are the movies from database', thumbnailsFromDb);

                    const totalThumbnails = thumbnailsFromDb.data.concat(thumbnailsFromOther.data);
                    this.thumbnails = totalThumbnails;
                    const finalThumbnails = totalThumbnails.slice(0, this.initial + 10);
                    this.initial = this.initial + 10;
                    console.log('final thumbnails', finalThumbnails);

                    this.changeThumbnails(finalThumbnails);
                  });
              });
          });
      })
      .catch((err) => {
        console.log('there was an error', err);
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
