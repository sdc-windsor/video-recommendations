import React, { Component } from 'react';
import Switch from 'react-switch';
 
class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
 
  render() {
    return (
      <div className="switchButtonContainer" >
        <div className="switchDiv">
          <Switch 
            className="switch" 
            onChange={this.handleChange} 
            checked={this.state.checked}
            height={15}
            width={30}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor={'#8498a4'}
            onColor={'#00adef'}
          />
        </div>
        <div className="switchName">
          <p className="switchText">Autoplay next video</p>
        </div>
      </div>
    );
  }
}

export default SwitchExample;