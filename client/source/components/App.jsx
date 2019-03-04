import React, { Component } from 'react';
import Switch from './Switch.jsx';
import Axios from 'axios';
import VideoContainer from './VideoContainer.jsx';
import Button from './Button.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.changeThumbnails = this.changeThumbnails.bind(this);
    this.changeVideo = this.changeVideo.bind(this);

    this.state = {
      thumbnails: []
    };
    const { classes } = props;
  }

  componentDidMount() {
    let id = window.location.pathname;
    id === '/' ? id = 1 : id = Number(id.split('/')[1]);
    Axios.get(`http://localhost:8081/categories/${id}`)

    .then((data) => {
      var targetCategory = data.data.categories[0];
      Axios.get(`http://localhost:8081/videosByCategory/${targetCategory}`)

      .then((videosByCategory) => {
        console.log('here are the videos', videosByCategory )
        var ids = videosByCategory.data.map((ele) => {
          return ele.video_id
        })
       var params = ids.join('%2C');
       const url = 'http://videoplayerservice-env.cdi5d5qypg.us-east-2.elasticbeanstalk.com';
       Axios.get(`${url}/thumbnails/${params}`)

       .then((thumbnailsFromOther) => {
        console.log('here are the thumbnails=============', thumbnailsFromOther);
        Axios.get(`http://localhost:8080/featured/${targetCategory}`)

        .then((thumbnailsFromDb) => {
          console.log('these are the movies from database', thumbnailsFromDb);

          var finalThumbnails = thumbnailsFromDb.data.concat(thumbnailsFromOther.data.slice(0,8));
          console.log('final thumbnails', finalThumbnails);
          
          this.changeThumbnails(finalThumbnails);
        })
       })
      })
    })
    .catch((err) => {
      console.log('there was an error', err)
    })
  }

  changeThumbnails(inputThumbnails) {
    this.setState({
      thumbnails: inputThumbnails
    })
  }

  changeVideo(inputId) {
    
  } 

  render() {

    let {thumbnails} = this.state;
    const { classes } = this.props;

    return (
      <div id="masterContainer" >
        <div className="sidenav">
          <h4 id='title'>Related Videos</h4>
          <Switch />
          <VideoContainer thumbnails = {thumbnails} changeVideo = {this.changeVideo}/>
          <div className="buttonContainer">
            <Button />
          </div>
        </div>
      </div>
    );
  }
}


 
