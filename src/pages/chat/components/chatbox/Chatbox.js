import React from 'react';
import { useState, useEffect } from 'react';

import TopBar from './components/TopBar/TopBar';
import MessageBox from './components/MessageBox/MessageBox';
import InputBox from './components/InputBox/InputBox';

import { getChatroom } from '../../../../api/chat.api';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [loading , setLoading] = useState(true);
    const [chatroom, setChatroom] = useState({});

    const chatroomID = window.location.pathname.split('/')[3];


    useEffect(() => {
        getChatroom(chatroomID, JSON.parse(localStorage.getItem('user'))._id)
            .then(data => {
                setChatroom(data);
                setMessages(data.messages);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="chatbox">
            {
                loading ?
                <div className="loading">
                    <div className="loader"></div>
                </div> :
                <>
                    <TopBar chatroom={chatroom} />
                    <MessageBox chatroom={chatroom} />
                    <InputBox chatroom={chatroom}  />
                </>
            }
            
        </div>
    );
};

export default Chatbox;