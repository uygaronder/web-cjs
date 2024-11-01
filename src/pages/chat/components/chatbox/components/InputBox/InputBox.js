import React, { useState } from 'react';

import { sendMessage } from '../../../../../../api/chat.api';

import './css/InputBox.css';
import X from '../../../../../../shared/assets/svg/x.svg';


const InputBox = (c, isReplyingTo, replyID) => {
    const chatroom = c.chatroom;

    const userID = JSON.parse(localStorage.getItem('user'))._id;

    isReplyingTo = isReplyingTo.isReplyingTo;
    const [inputValue, setInputValue] = useState('');
    const isAReply = isReplyingTo ? true : false;

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        
        const messageInfo = {
            message: inputValue,
            chatroomID: chatroom._id,
            reply: {
                isAReply: isAReply ? true : false,
                replyID: isAReply ? replyID : null,
            },
            userID: userID,
        };
        sendMessage(messageInfo)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
            setInputValue('');
    }

    return (
        <form className='inputbox'>
            {isReplyingTo && (
            <div className='replybox'>
                <div className='replybox-message'>
                    <div className='replybox-user'>{isReplyingTo.username}</div>
                    <div className='replybox-message-content'>{isReplyingTo.message}</div>
                </div>
                <button type='button'>
                    <img src={X} alt='Close' />
                </button>
            </div>
            )}
            <div className='inputs'>
                <input type='text' placeholder='Type a message' value={inputValue} onChange={handleChange} />
                <button type="submit" onClick={handleSendMessage}>Send</button>
            </div>
        </form>
    );
};

export default InputBox;