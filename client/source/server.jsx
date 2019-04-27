import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './components/App.jsx';
import { getVideosGQL } from '/../utils/getVideos.js';
import { PROD_IMAGE_PATH } from '../EC2.js';

module.exports = function render() {
  return renderToString(<App getVideos={getVideosGQL} imagePath={PROD_IMAGE_PATH} />);
};
