import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from "./pages/chat/Chat"

function WebChat() {
  return (
    <div className="webchat">
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Navigate to="/chat" />} />
      </Routes>
    </div>
  );
}

export default WebChat;
