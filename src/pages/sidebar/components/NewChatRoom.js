import React, { useState } from 'react';

import '../css/NewChatRoom.css';

import ChevronUp from '../../../shared/assets/svg/chevron-up.svg';
import CreateRoom from '../../../shared/assets/svg/plus.svg';

import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";

<<<<<<< HEAD
import { createChatroom, getPublicChatrooms } from '../../../api/chat.api';
import { useNavigate } from 'react-router-dom';

const NewChatRoom = ( { closeMenu, closePrompt, type } ) => {
    // type is either 'newChat' or 'findChat'
    const Navigate = useNavigate();
=======
import { createChatroom, getPublicChatrooms, joinPublicChatroom } from '../../../api/chat.api';
import { UserContext } from '../../../context/UserContext';

const NewChatRoom = ( { closePrompt, type } ) => {
    const { user } = React.useContext(UserContext);
>>>>>>> 8212d8cbe1ec119c37f9273fd38412ddd91f1cfc

    const roomPublicitySwitchRef = React.createRef();
    const publicRoomSearchRef = React.createRef();
    const privateRoomSearchRef = React.createRef();

    const [chatName, setChatName] = useState('');
    const [publicRoomInput, setPublicRoomInput] = useState('');
    const [privateRoomCode, setPrivateRoomCode] = useState('');
    const [publicRooms, setPublicRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [publicSearched, setPublicSearched] = useState(false);
    const [publicSearchLoading, setPublicSearchLoading] = useState(false);

    const invitedUsers = [];

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setChatName(inputValue);
        if (type === 'newRoom'){
            return;
        } else {
            handlePublicRoomSearch(inputValue);
        }
    };

    const handlePublicRoomSearch = (inputValue) => {
        setPublicSearchLoading(true);
        setPublicSearched(true);

        getPublicChatrooms(inputValue)
            .then(data => {
                setPublicRooms(data);
                console.log(data);
                setPublicSearchLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //setChatName('');
        const creatorId = JSON.parse(localStorage.getItem('user'))._id;
        const chatroomInfo = {
            name: chatName,
            creator: creatorId,
            roomType: 'group',
            roomPublicity: isPublic? 'public' : 'private',
            invitedUsers: invitedUsers,
        };
        
        createChatroom(chatroomInfo, creatorId)
            .then(data => {
                setLoading(false);
                closePrompt();
                closeMenu();
                Navigate('/c/chat/' + data._id);
            })
            .catch(error => {
            setLoading(false);
            });
    };

    const handleRoomPublicitySwitch = () => {
        setIsPublic(!isPublic);
        roomPublicitySwitchRef.current.classList.toggle('switchActive');
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
    
    const handlePublicRoomMenuToggle = (e) => {
        console.log('public room menu toggle');
    }

    const handlePrivateRoomMenuToggle = (e) => {
        console.log('private room menu toggle');
    }

    const handleJoinPublicRoom = (roomId) => {
        joinPublicChatroom(roomId, user._id)
            .then(data => {
                window.location.href = `/c/${data._id}`;
            })
            .catch(error => {
                console.error(error);
            });
    }
    
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
                {
                    type === 'newRoom' && 
                    <span className='createRoomButton' onClick={handleSubmit}>
                        <img src={CreateRoom} alt='Create' />
                    </span>
                }
                
            </div>
            <div>
                <input
                    type="text"
                    placeholder={type === 'newRoom' ? 'Room Name' : 'Search Public Rooms'}
                    value={chatName}
                    onChange={handleInputChange}
                />
            </div>
            <span className='verticalDivider'></span>
            <div className='chatroomDropdownMenus'>
                {
                    type === 'newRoom' ?
                    <div className='chatroomDropdownMenuContainer'>
                        <div className='chatroomDropdownMenuControls' onClick={(e) => {handleDropwonActivate(e)}}>
                            <p className='dropdownTitle'>Room Settings</p>
                            <div className='dropdownChevron'>
                                <img src={ChevronUp} alt='Chevron' />
                            </div>
                        </div>
                        <div className='chatroomDropdownMenuContents'>
                            <div className='menuContent'>
                                <p className='menuContentTitle'>Room Type</p>
                                <div className='publicOrPrivateSlider' onClick={handleRoomPublicitySwitch}>
                                    <p>Private</p>
                                    <label className="switch" ref={roomPublicitySwitchRef}>
                                        <span className='slider'></span>
                                    </label>
                                    <p>Public</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='findRoomsMenu'>
                        <div className='publicRoomMenu'>
                            <div className='roomMenuUpper'>
                                <p>Find Public Rooms</p>
                                {
                                    /*
                                    menu toggle to be implemented later
                                    <div className='optionToggle'>
                                        <img src={ChevronUp} alt='Chevron' />
                                    </div>
                                    */
                                }
                            </div>
                            <div className='publicFoundRooms'>
                                {
                                    // possibly hide this if the user deletes the search input in the future
                                    publicSearched ? !publicSearchLoading ? publicRooms.length === 0 ? 
                                    <p>No rooms found by that name</p> 
                                    : publicRooms.map((room, index) => {
                                        return (
                                            <div className='publicRoom' key={index} >
                                                <div className='publicRoomInfo'>
                                                    <img src='https://via.placeholder.com/150' alt='Room Avatar' />
                                                    <div className='publicRoomInfoText'>
                                                        <p>{room.name}</p>
                                                        <p>{room.userCount + " users"}</p>
                                                    </div>
                                                    {}
                                                    <button onClick={() => handleJoinPublicRoom(room.id)}>Join</button>
                                                </div>
                                            </div>
                                        );
                                    })
                                    : <LoadingSpinner /> 
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className='privateRoomMenu'>
                            <div className='divider'></div>
                            <div className='roomMenuUpper'>
                                <p>Join Private Room</p>
                                {
                                    /*
                                    menu toggle to be implemented later
                                    <div className='optionToggle'>
                                        <img src={ChevronUp} alt='Chevron' />
                                    </div>
                                    */
                                }
                            </div>
                            <div className='privateInputs'>
                                <input type='text' placeholder='Room Code' />
                                <button>Send Join Invite</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default NewChatRoom;