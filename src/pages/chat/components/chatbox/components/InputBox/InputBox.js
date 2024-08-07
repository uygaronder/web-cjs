import React, { useState } from 'react';

import { sendMessage } from '../../../../../../api/chat.api';

import './css/InputBox.css';
import X from '../../../../../../shared/assets/svg/x.svg';


const InputBox = (c, isReplyingTo) => {
    isReplyingTo = isReplyingTo.isReplyingTo;
    const [textMessage, setTextMessage] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
        console.log('Submitted:', inputValue);
        setTextMessage('');
    };

    const handleSendMessage = () => {
        sendMessage(c.chatroom._id, inputValue)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <form onSubmit={handleSubmit} className='inputbox'>
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
                <input
                    type="text"
                    value={textMessage}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
                <button type="submit" onClick={handleSendMessage}>Send</button>
            </div>
        </form>
    );
};

export default InputBox;