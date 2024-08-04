import React from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";

import NewChatRoom from "./components/NewChatRoom";

import Menu from "../../shared/assets/svg/menu.svg";
import NewChat from "../../shared/assets/svg/new-chat.svg";
import Search from "../../shared/assets/svg/search.svg";

const Sidebar = () => {
  const chatrooms = JSON.parse(localStorage.getItem("chatrooms"));
  const newChatContainerRef = React.createRef();
  const inputRef = React.createRef();
  const handleSearchBarClick = () => {
    inputRef.current.focus();
  };


  const handleNewChatPrompt = () => {
    console.log(newChatContainerRef.current);
    newChatContainerRef.current.className = "newChatContainer newChatContainerActive";
  };

  const closePrompt = () => {
    newChatContainerRef.current.className = "newChatContainer";
  };

  return (
    <div className="sidebar">
      <div className="newChatContainer" ref={newChatContainerRef}>
        <NewChatRoom closePrompt={closePrompt} />
      </div>
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          <img src="https://placehold.co/100x100" alt="Avatar" />
        </div>
        <div className="sidebar-header-buttons">
          <img src={NewChat} alt="NewChat" onClick={() => handleNewChatPrompt()}/>
          <img src={Menu} alt="Menu" />
        </div>
      </div>
      <div className="sidebar-upper">
        <div className="sidebar-search-bar" onClick={handleSearchBarClick}>
          <img src={Search} alt="Search" />
          <input type="text" placeholder="Search" ref={inputRef} />
        </div>
      </div>
      <div className="sidebar-body">
        <ul className="sidebar-chats">
          {!chatrooms ? chatrooms.map((chatroom) => (
            <Link
              to={`/c/chat/${chatroom._id}`}
              className="sidebar-chat"
              key={chatroom._id}
            >
              <div className="chat-avatar">
                <img src="https://placehold.co/100x100" alt="Avatar" />
              </div>
              <div className="chat-details">
                <div className="chat-name">{chatroom.name}</div>
                <div className="chat-message">{chatroom.lastMessage}</div>
              </div>
            </Link>
          )) : 
            <div className="no-chat-prompt">
              <p>No chats yet</p>
              <p onClick={handleNewChatPrompt}>Start a new chat</p>
            </div>
          }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;