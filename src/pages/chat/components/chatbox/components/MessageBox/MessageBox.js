import React, { useEffect, useRef, useState } from 'react';
import { format, isSameDay, parseISO, isValid } from 'date-fns';

import Message from './components/Message';

import "./css/Message.css";
import "./css/MessageBox.css";

// I've noticed that whatsapp uses the loaded last message quickly load the last message on chatroom change and then load the rest of the messages

const MessageBox = ({ chatroom ,messages, onScrollTop, loadingOlderMessages }) => {
    const messageEndRef = useRef(null);
    const messageBoxRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
    const previousScrollHeightRef = useRef(0);
    const [shouldRestoreScroll, setShouldRestoreScroll] = useState(false);

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
            
            if (scrollTop === 0 && !loadingOlderMessages) {
                previousScrollHeightRef.current = messageBoxRef.current.scrollHeight;
                setShouldRestoreScroll(true);
                onScrollTop();
            }
            
        }
    };

    useEffect(() => {
        if (loadingOlderMessages || shouldRestoreScroll) return; // skip during 

        if (isAtBottom) {
            scrollToBottom();
        } else {
            setShowNewMessageIndicator(true);
        }
    }, [messages, loadingOlderMessages, shouldRestoreScroll]);

    useEffect(() => {
        if (shouldRestoreScroll && previousScrollHeightRef.current && messageBoxRef.current) {
            const container = messageBoxRef.current;
            const newScrollHeight = container.scrollHeight;
            const delta = newScrollHeight - previousScrollHeightRef.current;

            container.scrollTop = delta;
            previousScrollHeightRef.current = 0;
            setShouldRestoreScroll(false); // reset flag
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
            if (message.type === 'system') {
                formattedMessages.push(
                    <Message
                        key={message._id || index}
                        text={message.text}
                        type={message.type}
                    />
                );
                return;
            }
            const displayUsername = () => {
                if (index === 0) return true;
                if (messages[index - 1].user == undefined) return true;
                if (message.user._id !== messages[index - 1].user._id) return true;
                return false;
            };

            formattedMessages.push(
                <Message
                    key={message._id || index}
                    text={message.text}
                    sender={message.user._id === JSON.parse(localStorage.getItem('user'))._id ? 'me' : 'other'}
                    time={format(messageDate, 'p')}
                    id={message._id}
                    username={message.user.username}
                    displayUsername={displayUsername()}
                    type={message.type}
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