// render app.js 

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import '../public/styles.css';

console.log ('Index.js is running!');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
