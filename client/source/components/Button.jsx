import React from 'react';

const Button = ({ addThumbnails }) => (
  <div>
    <button type="submit" className="button" onClick={addThumbnails}>Show more... </button>
  </div>
);

export default Button;
