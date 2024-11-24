import React from 'react';

import './css/WebChatHome.css';

const handleStartNewChat = () => {
    console.log('Start New Chat');
};

const handleJoinChat = () => {
    console.log('Join Chat');
};

const WebChatHome = () => {
    return (
        <div className='webChatHome'>
            <p>No Chat Active</p>
            <div className='webChatHomeOptions'>
                {/*
                    <button onClick={() => handleStartNewChat}>Start New Chat</button>
                    <span>Or</span>
                    <button onClick={() => handleJoinChat}>Join Chat</button>"
                */}
            </div>
        </div>
    );
};

export default WebChatHome;