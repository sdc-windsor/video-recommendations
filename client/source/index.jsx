import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { getVideos } from '../../utils/getVideos.js';

ReactDOM.render(<App getVideos={getVideos} />, document.getElementById('Recommendations'));
