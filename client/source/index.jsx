import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// import { getVideos } from '../../utils/getVideos.js';
import { getVideosGQL } from '../../utils/getVideos.js';

ReactDOM.render(<App getVideos={getVideosGQL} />, document.getElementById('Recommendations'));
