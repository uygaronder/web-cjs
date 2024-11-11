import React from 'react';

import Chevron from '../../../../../../../shared/assets/svg/chevron-up.svg';

const Message = ({ text, sender, time, id, username, displayUsername, type}) => {
    if (sender === 'me') {
        sender = 'message-sender-me';
    } else {
        sender = 'message-sender-other';
    }

    const handleSystemMessageClick = () => {
        console.log('system message clicked');
    }

    if(type === 'system') {
        return (
            <div className={`message system`}>
                <div className='message-content' onClick={() => handleSystemMessageClick}>
                    <div className={`message-bubble`}>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`message ${sender} ${type}`}>
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
    }
    
};

export default Message;