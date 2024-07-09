import React from 'react';

const Message = ({ text, sender, time }) => {
    if (sender === 'me') {
        sender = 'message-sender-me';
    } else {
        sender = 'message-sender-other';
    }
    return (
        <div className={`message ${sender}`}>
            <div className={`message-bubble`}>
                <p>{text}</p>
            </div>
            <div className="message-time">{time}</div>
        </div>
    );
};

export default Message;