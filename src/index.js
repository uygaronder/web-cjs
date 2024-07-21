import React from 'react';
import ReactDOM from 'react-dom/client';

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './utility/auth';

import "./shared/css/root.css"

import WebChat from './WebChat';
import Login from './pages/login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="c/*" element={<AuthProvider><WebChat /></AuthProvider>} />
        <Route path="a/*" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
