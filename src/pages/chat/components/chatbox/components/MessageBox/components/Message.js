import React from 'react';

import Chevron from '../../../../../../../shared/assets/chevron-up.svg';

const Message = ({ text, sender, time, id }) => {
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
            <div className='more-options'>
                <img src={Chevron} alt='More options' />
            </div>
        </div>
    );
};

export default Message;