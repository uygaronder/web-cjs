import React from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";

import Menu from "../../shared/assets/svg/menu.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-upper">
        <div className="sidebar-dropdown-menu-container">
            <img src={Menu} alt="Menu" />
            <div className="sidebar-dropdown-menu">
                <ul>
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                </ul>
            </div>
        </div>
      </div>
      <div className="sidebar-body">
        <ul className="sidebar-chats">
          <Link to="/chat" className="sidebar-chat">
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