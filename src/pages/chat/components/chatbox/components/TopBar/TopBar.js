import React, { useEffect } from 'react';
import { useState, useRef } from 'react';

import { deleteChatroom } from '../../../../../../api/chat.api';

import "./css/TopBar.css";

import More from "../../../../../../shared/assets/svg/more-vertical.svg";

const TopBar = ({ chatroom, chatSocket }) => {
    const [typingUsers, setTypingUsers] = useState([]);
    const [showInfoMessage, setShowInfoMessage] = useState(true);
    const [topBarMenuOpen, setTopBarMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const DISTANCE_THRESHOLD = 400;

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

    useEffect(() => {
        if (topBarMenuOpen) {
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [topBarMenuOpen]);

    const handleMouseMove = (event) => {
        if (menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect();
            const menuCenterX = menuRect.left + menuRect.width / 2;
            const menuCenterY = menuRect.top + menuRect.height / 2;

            const distance = Math.sqrt(
                Math.pow(event.clientX - menuCenterX, 2) +
                Math.pow(event.clientY - menuCenterY, 2)
            );

            if (distance > DISTANCE_THRESHOLD) {
                setTopBarMenuOpen(false);
            }
        }
    };

    const handleOpenMoreMenu = () => {
        setTopBarMenuOpen(!topBarMenuOpen);
    };

    const displayMessage = typingUsers.length > 0
    ? `${typingUsers.length > 1 ? 'Several people are typing...' : 'Someone is typing...'}`
    : showInfoMessage ? 'Click here for more info' : '';

    const handleDeleteChatroom = () => {
        deleteChatroom(chatroom._id)
            .then(() => {
                window.location.href = '/';
            })
            .catch(error => {
                console.error(error);
            });
    };

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
            <div className="top-bar-buttons" ref={menuRef}>
                <button className="top-bar-button" onClick={handleOpenMoreMenu}>
                    <img src={More} alt="More" />
                </button>
                <div className={`top-bar-menu ${topBarMenuOpen ? 'open' : ''}`}>
                    <p className="top-bar-menu-item">Leave Chat</p>
                    <p className="top-bar-menu-item" onClick={handleDeleteChatroom}>Delete Chat</p>
                </div>
            </div>
        </div>
    );
};

export default TopBar;