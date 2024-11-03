import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TopBar from './components/TopBar/TopBar';
import MessageBox from './components/MessageBox/MessageBox';
import InputBox from './components/InputBox/InputBox';

import { getChatroom, getMessages } from '../../../../api/chat.api';
import { chatSocket } from '../../../../socket';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [loading , setLoading] = useState(true);
    const [chatroom, setChatroom] = useState(null);

    const { chatroomID } = useParams();

    useEffect(() => {
        chatSocket.emit('joinRoom', chatroomID);

        chatSocket.on('receiveMessage', (message) => {
            console.log('Received message:', message);
            console.log('Chatroom ID:', chatroomID);

            if (message.chatroom === chatroomID) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            chatSocket.emit('leave', chatroomID);
            chatSocket.off('receiveMessage');
        };

    }, [chatroomID]);


    useEffect(() => {
        getChatroom(chatroomID, JSON.parse(localStorage.getItem('user'))._id)
            .then(data => {
                setChatroom(data);

                getMessages(chatroomID)
                    .then(data => {
                        setMessages(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });

                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, [chatroomID]);

    const handleSendMessage = (messageContent) => {
        chatSocket.emit('sendMessage', {
            message: messageContent,
            chatroomID: chatroomID,
            userID: JSON.parse(localStorage.getItem('user'))._id,
        });
    };

    return (
        <div className="chatbox">
            {
                loading ?
                <div className="loading">
                    <div className="loader"></div>
                </div> :
                <>
                    <TopBar chatroom={chatroom} chatSocket={chatSocket} />
                    <MessageBox chatroom={chatroom} messages={messages} />
                    <InputBox chatroom={chatroom} isReplyingTo={null} onSendMessage={handleSendMessage} />
                </>
            }
            
        </div>
    );
};

export default Chatbox;