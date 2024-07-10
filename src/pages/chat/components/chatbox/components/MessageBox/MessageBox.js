import React from 'react';

import Message from './components/Message';

import "./css/Message.css";
import "./css/MessageBox.css";

const MessageBox = () => {
    return (
        <div className="message-box">
            <Message text="Hello!" sender="me" time="10:00" />
            <Message text="Hi!" sender="other" time="10:01" />
            <Message text="Hi!" sender="other" time="10:01" />
            <Message text="Hi!" sender="other" time="10:01" />
            <Message text="Hi!" sender="other" time="10:01" />
            <Message text="How are you?" sender="me" time="10:02" />
            <Message text="I'm good, thanks!" sender="other" time="10:03" />
            <Message text="I'm good, thanks!" sender="other" time="10:04" />
            <Message text="I'm good, thanks!" sender="other" time="10:05" />
            <Message text="Hi! this is a reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaly long messageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" sender="other" time="10:01" />
            <Message text="Hi! this is a reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaly long messageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee but from me" sender="me" time="10:01" />
        </div>
    );
};

export default MessageBox;