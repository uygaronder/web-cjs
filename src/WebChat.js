import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from "./pages/chat/Chat"
import WebChatHome from "./pages/chat/components/webchathome/WebChatHome"
import Sidebar from "./pages/sidebar/Sidebar"

import './shared/css/WebChat.css';

import { pingServer } from './utility/connect';
import { getChatrooms } from './api/chat.api';

pingServer();
const user = JSON.parse(localStorage.getItem('user'));

console.log('user._id: ', user._id);

getChatrooms(user._id)
  .then(data => {
    localStorage.setItem('chatrooms', JSON.stringify(data));
  })
  .catch(error => {
    console.error(error);
  });

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
