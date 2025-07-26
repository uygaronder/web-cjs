# 📝 WebChat – Bugs/To-Do List

A minimal real-time chat app powered by WebSockets. This checklist tracks current bugs, improvements, and planned features.

---

## 🐞 Bugs & Stability Fixes

- [x] Fix issue where sender does not see their own message
  - [x] Server should broadcast to **all clients**, including sender
  - [x] Client should **not filter out own messages** on receive
  - [x] Fix where sometimes the message displays even when the user is in a different chatroom 
- [ ] Add logging for dropped or failed messages
- [ ] Fix avatar display issue

---

## ⚙️ Core Features

- [x] Real-time messaging via WebSockets
- [x] Display sender's own messages in chat view
- [x] Auto-scroll to newest message
- [x] Display timestamps for each message
- [x] Basic user system (username or ID)
- [x] Join/create chat rooms (channel support)

---

## 💡 UI/UX Improvements

- [x] Show WebSocket connection status (online/offline)
- [x] Show loading indicator while connecting
- [x] Style sent vs. received messages differently
- [x] Add form validation (e.g., empty messages)

---

## 🛡️ Reliability & Scalability

- [ ] Implement heartbeat (ping/pong) to keep connection alive
- [ ] Add server-side cleanup of dead connections
- [ ] Add rate-limiting or message throttling to prevent spam

---

## 📦 Future Enhancements

- [x] Persistent chat history (with database)
- [x] Typing indicators
- [ ] Media/file attachments
- [ ] Authentication and user sessions
- [ ] Admin/mod tools (mute, kick, etc.)

---

## 🧪 Debugging & Dev Tools

- [ ] Add dev-mode logging toggle (client/server)
- [ ] Improve error messages for failed connections

---
