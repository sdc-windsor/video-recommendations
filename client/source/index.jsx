import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// import { getVideos } from '../../utils/getVideos.js';
import { getVideosGQL } from '../../utils/getVideos.js';
import { PROD_IMAGE_PATH } from '../../EC2.js';

ReactDOM.render(<App getVideos={getVideosGQL} imagePath={PROD_IMAGE_PATH} />, document.getElementById('Recommendations'));
