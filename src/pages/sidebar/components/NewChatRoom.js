import React, { useState } from 'react';

import '../css/NewChatRoom.css';

import ChevronUp from '../../../shared/assets/svg/chevron-up.svg';
import CreateRoom from '../../../shared/assets/svg/plus.svg';

import { createChatroom } from '../../../api/chat.api';

const NewChatRoom = ( {closePrompt} ) => {
    const [chatName, setChatName] = useState('');
    const [loading, setLoading] = useState(false);
    const invitedUsers = [];

    const handleInputChange = (e) => {
        setChatName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setChatName('');
        const creatorId = JSON.parse(localStorage.getItem('user'))._id;
        const chatroomInfo = {
            name: chatName,
            creator: creatorId,
            roomType: 'group',
            roomPublicity: 'public',
        };
        
        createChatroom(chatroomInfo, creatorId, invitedUsers)
            .then(data => {
            console.log(data);
            setLoading(false);
            closePrompt();
            })
            .catch(error => {
            console.error(error);
            setLoading(false);
            });
    };

    const handleDropwonActivate = (e) => {
        const currentMenu = e.target.closest('.chatroomDropdownMenuContainer');
        if (currentMenu.classList.contains('dropdownActive')) {
            currentMenu.classList.remove('dropdownActive');
        } else {
            const dropdownMenus = document.querySelectorAll('.chatroomDropdownMenuContainer');
            dropdownMenus.forEach((menu) => {
                menu.classList.remove('dropdownActive');
            });
            currentMenu.classList.add('dropdownActive');
        }
    };

    {/* already wrapped in upper component */}
    return (
        <>
            {loading && 
                <div className='loadingSpinner'>
                    <span className='spinner'></span>
                </div>
            }
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
            <div className='chatroomDropdownMenus'>
                <div className='chatroomDropdownMenuContainer'>
                    <div className='chatroomDropdownMenuControls' onClick={(e) => {handleDropwonActivate(e)}}>
                        <p className='dropdownTitle'>Settings</p>
                        <div className='dropdownChevron'>
                            <img src={ChevronUp} alt='Chevron' />
                        </div>
                    </div>
                    <div className='chatroomDropdownMenuContents'>
                        Contents
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewChatRoom;