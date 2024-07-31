import React, { useState } from 'react';

import '../css/NewChatRoom.css';

import ChevronUp from '../../../shared/assets/svg/chevron-up.svg';
import CreateRoom from '../../../shared/assets/svg/plus.svg';

import { createChatroom } from '../../../shared/api/chat.api';

const NewChatRoom = ( {closePrompt} ) => {
    const [chatName, setChatName] = useState('');

    const handleInputChange = (e) => {
        setChatName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to create a new chat room with the chatName

        // Reset the input field
        setChatName('');
    };

    //closePrompt();  // closePrompt is a function passed as a prop from Sidebar.js
    
    {/* already wrapped in upper component */}
    return (
        <>
            <div className='newChatRoomUpperButtons'>
                <span className='backButton' onClick={closePrompt}>
                    <img src={ChevronUp} alt='Back' />
                </span>
                <span className='createRoomButton' onClick={handleSubmit}>
                    <img src={CreateRoom} alt='Create' />
                </span>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter chat room name"
                    value={chatName}
                    onChange={handleInputChange}
                />
            </div>
            <span className='verticalDivider'></span>
        </>
    );
};

export default NewChatRoom;