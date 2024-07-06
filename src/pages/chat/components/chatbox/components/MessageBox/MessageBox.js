import React from 'react';

import Message from './components/Message';

import "./css/Message.css";
import "./css/MessageBox.css";

const MessageBox = () => {
    return (
        <div className="message-box">
            <Message text="Hello, how can I help you today?" sender="bot" />
            <Message text="I need help with my order" sender="user" />
            <Message text="Sure, what is your order number?" sender="bot" />
        </div>
    );
};

export default MessageBox;