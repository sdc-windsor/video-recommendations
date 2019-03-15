import React, { Component } from 'react';

export default class Button extends Component {
  render() {

    let {addThumbnails} = this.props;
    return (
      <div>
        <button className="button" onClick = {addThumbnails}>Show more... </button>
      </div>
    );
  }
}


