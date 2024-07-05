import React from 'react';

const Message = ({ text, sender }) => {
    return (
        <div className="message">
            <span className="sender">{sender}</span>
            <p className="text">{text}</p>
        </div>
    );
};

export default Message;