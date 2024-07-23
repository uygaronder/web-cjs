import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from "./pages/chat/Chat"
import WebChatHome from "./pages/chat/components/webchathome/WebChatHome"
import Sidebar from "./pages/sidebar/Sidebar"

import './shared/css/WebChat.css';

import { pingServer } from './utility/connect';

pingServer();

// console log user details from local storage
const user = localStorage.getItem('user');
console.log('User: ', user);

function WebChat() {
  return (
    <div className="webchat">
      <Sidebar />
      <Routes>
        <Route path="chat" element={<Chat />} />
        <Route path="*" element={<WebChatHome />} />
      </Routes>
    </div>
  );
}

export default WebChat;
