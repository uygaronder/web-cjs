import React from 'react';

import Chevron from '../../../../../../../shared/assets/svg/chevron-up.svg';

const Message = ({ text, sender, time, id, username, displayUsername}) => {
    console.log("Message: ", text, sender, time, id, username, displayUsername);

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
            <div className='more-options'></div>
        </div>
    );
};

export default Message;