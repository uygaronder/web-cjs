import React, { useState } from 'react';

import '../css/NewChatRoom.css';

const NewChatRoom = () => {
    const [chatName, setChatName] = useState('');

    const handleInputChange = (e) => {
        setChatName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to create a new chat room with the chatName
        console.log(`Creating new chat room: ${chatName}`);
        // Reset the input field
        setChatName('');
    };

    return (
        <div>
            <div>
                <span className='backButton'></span>
                <input
                    type="text"
                    placeholder="Enter chat room name"
                    value={chatName}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default NewChatRoom;