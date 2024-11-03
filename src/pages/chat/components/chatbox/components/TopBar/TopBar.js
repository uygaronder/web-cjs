import React, { useEffect } from 'react';
import { useState } from 'react';

import "./css/TopBar.css";

import More from "../../../../../../shared/assets/svg/more-vertical.svg";

const TopBar = ({ chatroom, chatSocket }) => {
    const [typingUsers, setTypingUsers] = useState([]);
    const [showInfoMessage, setShowInfoMessage] = useState(true);

    useEffect(() => {
        resetInfoMessageTimeout();
    }, [chatroom]);

    const resetInfoMessageTimeout = () => {
        setShowInfoMessage(true);
        setTimeout(() => {
            setShowInfoMessage(false);
        }, 2000);
    };

    useEffect(() => {
        chatSocket.on('userTypingReceive', ({ userID }) => {
            setTypingUsers((prev) => [...new Set([...prev, userID])]);
        });

        chatSocket.on('userStoppedTypingReceive', ({ userID }) => {
            setTypingUsers((prev) => prev.filter(id => id !== userID));
        });

        return () => {
            chatSocket.off('userTypingReceive');
            chatSocket.off('userStoppedTypingReceive');
        };
    }, [chatSocket]);

    const displayMessage = typingUsers.length > 0
    ? `${typingUsers.length > 1 ? 'Several people are typing...' : 'Someone is typing...'}`
    : showInfoMessage ? 'Click here for more info' : '';

    return (
        <div className="top-bar">
            <div className="top-bar-info">
                <div className="top-bar-chat-avatar">
                    <img src="https://via.placeholder.com/150" alt="Chat Avatar" />
                </div>
                <div className='top-bar-info-texts'>
                    <div className="top-bar-chat-name">{chatroom.chatroomInfo.name}</div>
                    {
                        displayMessage && (
                            <div className="top-bar-chat-typing-bar">
                                {displayMessage}
                            </div>
                        )
                    }
                </div>
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