import React from 'react';

import Message from './components/Message';

import { getMessages } from '../../../../../../api/chat.api';

import "./css/Message.css";
import "./css/MessageBox.css";

const MessageBox = (c) => {
    const chatroom = c.chatroom;

    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        getMessages(chatroom._id)
            .then(data => {
                setMessages(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="message-box">
            {false && chatroom.messages.slice(-100).map((message, index) => (
                <Message
                    key={index}
                    text={message.text}
                    sender={message.user._id === JSON.parse(localStorage.getItem('user'))._id ? "me" : "other"}
                    time={message.createdAt}
                />
            ))}
            {messages.map((message, index) => (
                <Message
                    key={index}
                    text={message.text}
                    sender={message.user._id === JSON.parse(localStorage.getItem('user'))._id ? "me" : "other"}
                    time={message.createdAt}
                />
            ))}
        </div>
    );
};

export default MessageBox;