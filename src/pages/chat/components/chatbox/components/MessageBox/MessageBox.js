import React from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import socket from '../../../../../../socket';

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

        socket.on('receiveMessage', (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const renderMessagesWithDateHeaders = () => {
        const formattedMessages = [];
        let lastMessageDate = null;

        messages.forEach((message, index) => {
            const messageDate = parseISO(message.createdAt); // Parse the date
            if (!lastMessageDate || !isSameDay(messageDate, lastMessageDate)) {
                formattedMessages.push(
                    <div key={`date-${index}`} className="message-box-date-indicator">
                        {format(messageDate, 'MMMM d, yyyy')} {/* Display date as Month Day, Year */}
                    </div>
                );
                lastMessageDate = messageDate;
            }
            formattedMessages.push(
                <Message
                    key={message._id || index}
                    text={message.text}
                    sender={message.user._id === JSON.parse(localStorage.getItem('user'))._id ? 'me' : 'other'}
                    time={format(messageDate, 'p')} // Display time only for each message
                />
            );
        });

        return formattedMessages;
    };

    return (
        <div className="message-box">
            {renderMessagesWithDateHeaders()}
            {/*
            <div className='message-box-date-indicator'>
                <p>Today</p>
            </div>
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
            */}
            
        </div>
    );
};

export default MessageBox;