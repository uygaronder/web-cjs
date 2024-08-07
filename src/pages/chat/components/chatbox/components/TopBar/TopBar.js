import React from 'react';
import { useState } from 'react';

import "./css/TopBar.css";

import More from "../../../../../../shared/assets/svg/more-vertical.svg";

const TopBar = (c) => {
    const chatroom = c.chatroom;

    return (
        <div className="top-bar">
            <div className="top-bar-info">
                <div className="top-bar-chat-avatar">
                    <img src="https://via.placeholder.com/150" alt="Chat Avatar" />
                </div>
                <div className="top-bar-chat-name">{chatroom.chatroomInfo.name}</div>
            </div>
            <div className="top-bar-buttons">
                <button className="top-bar-button">
                    <img src={More} alt="More" />
                </button>
            </div>
        </div>
    );
};

export default TopBar;