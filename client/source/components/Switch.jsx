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
      <div>
        <div className="switchDiv">
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            height={15}
            width={30}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor="#8498a4"
            onColor="#00adef"
          />
        </div>
        <p className="switchText">Autoplay next video</p>
      </div>
    );
  }
}

export default SwitchExample;
