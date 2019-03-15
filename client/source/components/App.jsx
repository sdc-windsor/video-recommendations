import React, { Component } from 'react';
import Switch from './Switch.jsx';
import Axios from 'axios';
import VideoContainer from './VideoContainer.jsx';
import Button from './Button.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.changeThumbnails = this.changeThumbnails.bind(this);
    this.addThumbnails = this.addThumbnails.bind(this);

    this.state = {
      thumbnails: []
    };
    const { classes } = props;

    this.thumbnails;

    this.initial = 0;
  }



  componentDidMount() {

    let id = window.location.pathname;
    id === '/' ? id = 1 : id = Number(id.split('/')[1]);
    //var urlCategory = 'http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com';
    var urlCategory = 'http://localhost:8081';
    Axios.get(`${urlCategory}/categories/${id}`)

      .then((data) => {
        var targetCategory = data.data.categories[0];
        //var urlVideoByCategory = 'http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com';
        var urlVideoByCategory = 'http://localhost:8081';
        Axios.get(`${urlVideoByCategory}/videosByCategory/${targetCategory}`)

          .then((videosByCategory) => {
            console.log('here are the videos', videosByCategory );
            var ids = videosByCategory.data.map((ele) => {
              return ele.video_id;
            });
            var params = ids.join('%2C');
            const url = 'http://videoplayerservice-env.cdi5d5qypg.us-east-2.elasticbeanstalk.com';
            Axios.get(`${url}/thumbnails/${params}`)

              .then((thumbnailsFromOther) => {
                console.log('here are the thumbnails=============', thumbnailsFromOther);
                let myUrl = 'http://sidebar-component-env.phjkgcp7vm.us-east-2.elasticbeanstalk.com';
                Axios.get(`${myUrl}/featured/${targetCategory}`)

                  .then((thumbnailsFromDb) => {
                    console.log('these are the movies from database', thumbnailsFromDb);

                    var totalThumbnails = thumbnailsFromDb.data.concat(thumbnailsFromOther.data);
                    this.thumbnails = totalThumbnails;
                    var finalThumbnails = totalThumbnails.slice(0, this.initial + 10);
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

  changeThumbnails(inputThumbnails) {
    this.setState({
      thumbnails: inputThumbnails
    });
  }

  addThumbnails() {
    this.initial = this.initial + 10;
    var additionalThumbnails = this.thumbnails.slice(0, this.initial);
    this.setState({
      thumbnails: additionalThumbnails
    });
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
            <Button addThumbnails = {this.addThumbnails} />
          </div>
        </div>
      </div>
    );
  }
}



