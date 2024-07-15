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
        <ul>
          <li>
            <Link to="/chat">.</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;