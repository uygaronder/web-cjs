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
            {displayUsername && <div className="message-username">{username}</div>}
            <div className='message-content'>
                <div className={`message-bubble`}>
                    <p>{text}</p>
                </div>
            </div>
            <div className='message-bottom'>
                <div className='more-options'></div>
                <div className="message-time">{time}</div>
            </div>
        </div>
    );
};

export default Message;