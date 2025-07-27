import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import TopBar from './components/TopBar/TopBar';
import MessageBox from './components/MessageBox/MessageBox';
import InputBox from './components/InputBox/InputBox';

import { getChatroom, getMessages } from '../../../../api/chat.api';
import { chatSocket } from '../../../../socket';
import { UserContext } from '../../../../context/UserContext';
import { constructNow } from 'date-fns';

const Chatbox = () => {
    const { user } = React.useContext(UserContext);

    const [messages, setMessages] = useState([]);
    const messageCountRef = useRef(0);
    const [loadingOlderMessages, setLoadingOlderMessages] = useState(false);
    const [loading , setLoading] = useState(true);
    const [chatroom, setChatroom] = useState(null);

    const { chatroomID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    }, [user]);

    useEffect(() => {
        chatSocket.emit('joinRoom', chatroomID);

        chatSocket.on('receiveMessage', (message) => {
            console.log("received message: ", message);
            if (message.chatroom === chatroomID) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        chatSocket.on('userJoinedReceive', (message) => {
            console.log("user joined: ",message);
            if (message.chatroom === chatroomID) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        chatSocket.on('userLeftReceive', (message) => {
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
        getChatroom(chatroomID, user._id)
            .then(data => {
                if (data.error){
                    navigate('/c/chat', { replace: true });
                    return;
                }

                setChatroom(data);

                getMessages(chatroomID)
                    .then(data => {
                        setMessages(data);
                        messageCountRef.current = data.length;
                    })
                    .catch(error => {
                        console.error(error);
                    });

                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                // if the chatroom does not exist in the users chats, redirect to the main chat page
                navigate('/c/chat', { replace: true });
            });
    }, [chatroomID]);

    const handleSendMessage = (messageContent) => {
        chatSocket.emit('sendMessage', {
            message: messageContent,
            chatroomID: chatroomID,
            userID: user._id,
        });
    };

    const handleScrollTop = () => {
        // Load older messages when the user scrolls to the top
        if (loadingOlderMessages) return;
        setLoadingOlderMessages(true);

        //messageBoxRef.current.scrollHeight && (previousScrollHeightRef.current = messageBoxRef.current.scrollHeight);

        getMessages(chatroomID, { skip: messageCountRef.current, limit: 50 })
        .then((res) => {
            if (res.length > 0) {
                console.log("Loaded older messages: ", res);
                setMessages(prev => [...res, ...prev]);
                messageCountRef.current += res.length;
            } else {
                console.log("No more messages to load.");
            }
        })
        .catch((error) => {
            console.error("Error loading older messages:", error);
        })
        .finally(() => {
            setLoadingOlderMessages(false);
        });

        setLoadingOlderMessages(false);
    }
    
    return (
        <div className="chatbox">
            {
                loading ?
                <div className="loading">
                    <div className="loader"></div>
                </div> :
                <>
                    <TopBar chatroom={chatroom} chatSocket={chatSocket} />
                    <MessageBox chatroom={chatroom} messages={messages} onScrollTop={handleScrollTop} loadingOlderMessages={loadingOlderMessages} />
                    <InputBox chatroom={chatroom} isReplyingTo={null} onSendMessage={handleSendMessage} />
                </>
            }
            
        </div>
    );
};

export default Chatbox;