import React from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";

import Menu from "../../shared/assets/svg/menu.svg";
import NewChat from "../../shared/assets/svg/new-chat.svg";
import Search from "../../shared/assets/svg/search.svg";

const Sidebar = () => {
  const inputRef = React.createRef();
  const handleSearchBarClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          <img src="https://placehold.co/100x100" alt="Avatar" />
        </div>
        <div className="sidebar-header-buttons">
          <img src={NewChat} alt="NewChat" />
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
          <Link to="/c/chat" className="sidebar-chat">
            <div className="chat-avatar">
              <img
                src="https://placehold.co/100x100"
                alt="Avatar"
              />
            </div>
            <div className="chat-details">
              <div className="chat-name">John Doe</div>
              <div className="chat-message">Hello, how are you?</div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;