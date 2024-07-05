import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';

import "./shared/css/root.css"

import WebChat from './WebChat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <WebChat />
    </Router>
  </React.StrictMode>
);
