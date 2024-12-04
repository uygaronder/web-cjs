import React, { useState, useRef } from 'react';

import { sendMessage } from '../../../../../../api/chat.api';
import { chatSocket } from '../../../../../../socket';

import './css/InputBox.css';
import X from '../../../../../../shared/assets/svg/x.svg';
import Paperclip from '../../../../../../shared/assets/svg/paperclip.svg';


const InputBox = ({chatroom, isReplyingTo, replyID, onSendMessage}) => {
    const userID = JSON.parse(localStorage.getItem('user'))._id;

    isReplyingTo = isReplyingTo;
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const isAReply = isReplyingTo ? true : false;
    const typingTimeout = useRef(null);
    const fileInputRef = useRef(null);

    /* for drag and drop file, not implemented yet
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    
        const file = e.dataTransfer.files[0];
        if (file) {
            console.log('Dropped file:', file);
            // Call your uploadFile function here
        }
    };

    */

    const handleSelectFileFromDevice = () => {
        fileInputRef.current.click(); // Programmatically trigger the file input
    };

    const handleFileInput = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file);
            // Call your uploadFile function here
        }
    };


    // for menu auto close
    React.useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleMouseMove = (e) => {
        const menu = document.querySelector('.text-input-file-share-menu');
        const rect = menu.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        if(menu.classList.contains('text-input-file-share-menu-closed')) return;
        if (distance > 250) {
            menu.classList.add('text-input-file-share-menu-closed');
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        handleTyping();
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        
        const messageInfo = {
            message: inputValue,
            chatroomID: chatroom._id,
            reply: {
                isAReply: isAReply ? true : false,
                replyID: isAReply ? replyID : null,
            },
            user:{
                _id: userID,
                username: JSON.parse(localStorage.getItem('user')).username,
            }
        };

        sendMessage(messageInfo)
            .then(data => {
                if (data) {
                    onSendMessage(data);
                }
            })
            .catch(error => {
                console.error(error);
            });
        
        setInputValue('');
        clearTimeout(typingTimeout.current);
        setIsTyping(false);
        chatSocket.emit('stopTyping', { chatroomID: chatroom._id, userID });
    }

    const handleTyping = () => {
        if (!isTyping) {
            setIsTyping(true);
            chatSocket.emit('typing', { chatroomID: chatroom._id, userID });
        }

        clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {
            setIsTyping(false);
            chatSocket.emit('stopTyping', { chatroomID: chatroom._id, userID });
        }, 3000);
    };

    const openMenu = () => {
        const menu = document.querySelector('.text-input-file-share-menu');
        menu.classList.toggle('text-input-file-share-menu-closed');
    }

    return (
        <form className='inputbox'>
            {isReplyingTo && (
            <div className='replybox'>
                <div className='replybox-message'>
                    <div className='replybox-user'>{isReplyingTo.username}</div>
                    <div className='replybox-message-content'>{isReplyingTo.message}</div>
                </div>
                <button type='button'>
                    <img src={X} alt='Close' />
                </button>
            </div>
            )}
            <div className='inputs'>
                <div className='text-input-container'>
                    <input type='text' placeholder='Type a message' value={inputValue} onChange={handleChange} />
                    <span className='text-input-file-share-menu-button'>
                        <img src={Paperclip} alt='Attach File' onClick={() => openMenu()}/>
                        <span className='text-input-file-share-menu text-input-file-share-menu-closed'>
                            <span className='text-input-file-share-menu-item' onClick={() => {handleSelectFileFromDevice()}}>
                            <p>Upload File</p>

                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileInput}
                            />
                            </span>
                        </span>
                    </span>
                </div>
                <button type="submit" onClick={handleSendMessage}>Send</button>
            </div>
            <div className='file-input-preview-container'>
                <div className='file-input-preview-highlighted-file-container'>
                    <div className='file-input-preview-highlighted-file'>
                        <img src={Paperclip} alt='File' />
                        <p>file-name.jpg</p>
                        <button type='button'>
                            <img src={X} alt='Close' />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default InputBox;