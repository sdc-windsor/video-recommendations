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
    console.log('heloooooooooooooooooooooooo')
    let id = window.location.pathname;
    console.log('id is here', id);
  }

  
  render() {

    let {thumbnails} = this.state;
    const { classes } = this.props;

    return (
      <div id="masterContainer" >
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


 
