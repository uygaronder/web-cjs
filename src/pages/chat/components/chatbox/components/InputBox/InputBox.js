import React, { useState } from 'react';

import './css/InputBox.css';

import X from '../../../../../../shared/assets/svg/x.svg';

const InputBox = (isReplyingTo) => {
    isReplyingTo = isReplyingTo.isReplyingTo;
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
        console.log('Submitted:', inputValue);
        setInputValue('');
    };

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
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </div>
        </form>
    );
};

export default InputBox;