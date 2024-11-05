import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import { UserProvider } from './context/UserContext'
import WebChatHome from "./pages/chat/components/webchathome/WebChatHome"
import Sidebar from "./pages/sidebar/Sidebar"
import Chatbox from "./pages/chat/components/chatbox/Chatbox"

import './shared/css/WebChat.css';

function WebChat() {
  return (
    <UserProvider>
      <div className="webchat">
        <Sidebar />
        <Routes>
            <Route path="/chat/:chatroomID" element={<Chatbox />} />
            <Route path="*" element={<WebChatHome />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default WebChat;
