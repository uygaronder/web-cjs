import React, { useEffect, useRef, useState } from 'react';
import { format, isSameDay, parseISO, isValid } from 'date-fns';

import Message from './components/Message';

import "./css/Message.css";
import "./css/MessageBox.css";

const MessageBox = ({ chatroom ,messages }) => {
    const messageEndRef = useRef(null);
    const messageBoxRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const handleScroll = () => {
        if (messageBoxRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messageBoxRef.current;
            const atBottom = scrollHeight - scrollTop === clientHeight;
            setIsAtBottom(atBottom);

            if (atBottom) {
                setShowNewMessageIndicator(false);
            }
        }
    };

    useEffect(() => {
        if (isAtBottom) {
            scrollToBottom();
        } else {
            setShowNewMessageIndicator(true);
        }
    }, [messages]);

    useEffect(() => {
        const messageBox = messageBoxRef.current;
        messageBox?.addEventListener('scroll', handleScroll);
        return () => messageBox?.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatroom]);

    const renderMessagesWithDateHeaders = () => {
        const formattedMessages = [];
        let lastMessageDate = null;

        messages.forEach((message, index) => {
            let messageDate;
            if (message.createdAt) {
                try {
                    messageDate = parseISO(message.createdAt);
                    if (!isValid(messageDate)) throw new Error("Invalid date");
                } catch (error) {
                    console.error("Error parsing message date:", message.createdAt, error);
                    messageDate = new Date();
                }
            } else {
                messageDate = new Date();
            }

            if (!lastMessageDate || !isSameDay(messageDate, lastMessageDate)) {
                formattedMessages.push(
                    <div key={`date-${index}`} className="message-box-date-indicator">
                        {format(messageDate, 'MMMM d, yyyy')}
                    </div>
                );
                lastMessageDate = messageDate;
            }

            // Render the message with time formatting
            formattedMessages.push(
                <Message
                    key={message._id || index}
                    text={message.text}
                    sender={message.user._id === JSON.parse(localStorage.getItem('user'))._id ? 'me' : 'other'}
                    time={format(messageDate, 'p')} // Display only time for each message
                />
            );
        });

        return formattedMessages;
    };

    return (
        <div className="message-box" ref={messageBoxRef}>
            {renderMessagesWithDateHeaders()}
            <div ref={messageEndRef} />
            {showNewMessageIndicator && (
                <div className="new-message-indicator-container">
                    <div className='new-message-indicator' onClick={scrollToBottom}>
                        <p>New Messages</p>
                    </div>
                </div>
            )}
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