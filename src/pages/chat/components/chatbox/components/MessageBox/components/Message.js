import React from 'react';

import Chevron from '../../../../../../../shared/assets/svg/chevron-up.svg';

const Message = ({ text, sender, time, id }) => {

    if (sender === 'me') {
        sender = 'message-sender-me';
    } else {
        sender = 'message-sender-other';
    }
    const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`message ${sender}`}>
            <div className={`message-bubble`}>
                <p>{text}</p>
            </div>
            <div className="message-time">{formattedTime}</div>
            <div className='more-options'></div>
        </div>
    );
};

export default Message;