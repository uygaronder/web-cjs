import React from 'react';
import ReactDOM from 'react-dom/client';

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { Auth } from './utility/auth';

import "./shared/css/root.css"

import WebChat from './WebChat';
import Login from './pages/login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="c/*" element={<Auth><WebChat /></Auth>} />
        <Route path="a/*" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
