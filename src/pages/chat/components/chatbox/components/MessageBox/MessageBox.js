import React from 'react';

import Message from './components/Message';

import "./css/Message.css";
import "./css/MessageBox.css";

const MessageBox = (c) => {
    const chatroom = c.chatroom;
    return (
        <div className="message-box">
            {chatroom.messages.slice(-100).map((message, index) => (
                <Message
                    key={index}
                    text={message.text}
                    sender={message.user === JSON.parse(localStorage.getItem('user'))._id ? "me" : "other"}
                    time={message.time}
                />
            ))}
        </div>
    );
};

export default MessageBox;