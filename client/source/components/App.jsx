import React, { Component } from 'react';
import Switch from './Switch.jsx';
import Axios from 'axios';
import VideoContainer from './VideoContainer.jsx';
import Button from './Button.jsx';




export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbnails: []
    };
    const { classes } = props;
    
  }

  componentDidMount() {
    Axios.get('//vimeo.com/api/v2/video/318070817.json')
      .then((res) => {
        console.log('result is here', res);
        let hold = [];
        let src = res.data[0].thumbnail_small;
        hold.push(src);
        this.setState({
          thumbnails: hold
        });
      })
      .catch((err) => {
        console.log('there was an error', err);
      });
  }

  
  render() {

    let {thumbnails} = this.state;
    const { classes } = this.props;

    return (
      <div >
        <div className="sidenav">
          <h4 id='title'>Related Videos</h4>
          <Switch />
          <VideoContainer thumbnails = {thumbnails}/>
          <div className="buttonContainer">
            <Button />
          </div>
        </div>
      </div>
    );
  }
}


 
