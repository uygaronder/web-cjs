import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from "./pages/chat/Chat"
import Sidebar from "./pages/sidebar/Sidebar"

import './shared/css/WebChat.css';

import { pingServer } from './utility/connect';

pingServer();

function WebChat() {
  return (
    <div className="webchat">
      <Sidebar />
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Navigate to="/chat" />} />
      </Routes>
    </div>
  );
}

export default WebChat;
