import React from 'react';

import TopBar from './components/TopBar/TopBar';
import MessageBox from './components/MessageBox/MessageBox';
import InputBox from './components/InputBox/InputBox';

const Chatbox = () => {
    return (
        <div className="chatbox">
            <TopBar />
            <MessageBox />
            <InputBox />
        </div>
    );
};

export default Chatbox;