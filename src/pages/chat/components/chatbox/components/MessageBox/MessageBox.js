import React from 'react';

const MessageBox = ({ message }) => {
    return (
        <div className="message-box">
            <p>{message}</p>
        </div>
    );
};

export default MessageBox;