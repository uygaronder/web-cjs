import React, { useState, useRef } from 'react';

import { sendMessage } from '../../../../../../api/chat.api';
import { chatSocket } from '../../../../../../socket';

import './css/InputBox.css';
import X from '../../../../../../shared/assets/svg/x.svg';
import Paperclip from '../../../../../../shared/assets/svg/paperclip.svg';
import Menu from '../../../../../../shared/assets/svg/menu.svg';
import { set } from 'date-fns';


const InputBox = ({chatroom, isReplyingTo, replyID, onSendMessage}) => {
    const userID = JSON.parse(localStorage.getItem('user'))._id;

    isReplyingTo = isReplyingTo;
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [files, setFiles] = useState([]);
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

    // this is bugged, it uses filePreview it should use the files array and display all the files
    const handleFileInput = (e) => {
        e.preventDefault();
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            const fileReaders = selectedFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                resolve({ file, preview: e.target.result });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            });

            Promise.all(fileReaders)
            .then(filesWithPreviews => {
                setFiles([...files, ...filesWithPreviews.map(f => f.file)]);
                setFilePreview(filesWithPreviews[0].preview);
                setIsFilePreviewOpen(true);
            })
            .catch(error => {
                console.error("Error reading files: ", error);
            });
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

    const closeFileMenu = () => {
        setIsFilePreviewOpen(false)
        setFiles([]);
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
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileInput}
                            />
                            </span>
                        </span>
                    </span>
                </div>
                <button type="submit" onClick={handleSendMessage}>Send</button>
            </div>
            {
                isFilePreviewOpen && (
                    <div className='file-input-preview-container'>
                        <div className='file-input-preview'>
                            <div className='file-input-preview-upper-options'>
                                <div className='file-input-preview-cancel-button' onClick={() => closeFileMenu()}>
                                    <img src={X} alt='Close' />
                                </div>
                                <p>Send File{files.length>1 && "s"}</p>
                                <img src={Menu} alt='More' />
                            </div>
                            <div className='file-input-preview-highlighted-file-container'>
                                <div className='file-input-preview-highlighted-files'>
                                    {files.map((file, index) => (
                                        <div className='file-input-preview-highlighted-file' key={index}>
                                            <img src={filePreview} alt='File Preview' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='file-input-preview-message-text'>
                                <input type='text' placeholder='Set Caption' />
                                <button type='button' onClick={() => setIsFilePreviewOpen(false)}>Send</button>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </form>
    );
};

export default InputBox;