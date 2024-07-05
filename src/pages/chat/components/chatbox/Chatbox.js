import React from 'react';

import MessageBox from './components/MessageBox/MessageBox';
import InputBox from './components/InputBox';

const Chatbox = () => {
    return (
        <div className="chatbox">
            <MessageBox />
            <InputBox />
        </div>
    );
};

export default Chatbox;