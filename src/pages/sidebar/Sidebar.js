import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";

import { getChatrooms } from "../../api/chat.api";

import { notificationSocket, chatSocket } from "../../socket";

import NewChatRoom from "./components/NewChatRoom";
import SidebarMenu from "./components/SidebarMenu";

import Menu from "../../shared/assets/svg/menu.svg";
import NewChat from "../../shared/assets/svg/new-chat.svg";
import Search from "../../shared/assets/svg/search.svg";
import Bell from "../../shared/assets/svg/bell.svg";

const Sidebar = () => {
  const chatroomIds = JSON.parse(localStorage.getItem("chats"));
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  
  const [sidebarLoading , setSidebarLoading] = useState(true);
  const [sidebarChats, setSidebarChats] = useState([]);

  const newChatContainerRef = React.createRef();
  const sidebarMenuRef = React.createRef();
  const sidebarMenuButtonRef = React.createRef();
  const inputRef = React.createRef();
  
  const handleSearchBarClick = () => {
    inputRef.current.focus();
  };


  useEffect(() => {
    getChatrooms(userId)
      .then(data => {
        setSidebarLoading(false);
        setSidebarChats(data);
  
        const chatroomIds = data.map((chatroom) => chatroom._id);
        notificationSocket.emit("listenForUpdates", chatroomIds);
  
        chatSocket.on("newMessageNotification", (notificationData) => {
          console.log("New notification: ", notificationData);
  
          setSidebarChats((prevChats) => {
            return prevChats.map(chatroom => {
              if (chatroom._id === notificationData.chatroomID) {
                return {
                  ...chatroom,
                  lastMessage: notificationData.message, // Update lastMessage only
                };
              }
              return chatroom;
            });
          });
        });
      })
      .catch(error => {
        setSidebarLoading(false);
        console.error(error);
      });
  
    return () => {
      chatSocket.off("newMessageNotification");
    };
  }, [userId]);
  
  const clearSearchBar = () => {
    inputRef.current.value = "";
  };

  const handleSearchBarChange = (event) => {
    // change what user is searching for taking in to account which menus are open
    const searchQuery = event.target.value;
  };

  const handleNewChatPrompt = () => {
    console.log(newChatContainerRef.current);
    newChatContainerRef.current.className = "newChatContainer newChatContainerActive";
  };

  const closePrompt = () => {
    newChatContainerRef.current.className = "newChatContainer";
  };

  const generateLastMessage = (lastMessage) => {
    let messageText = lastMessage.text;
    if (messageText.length > 20) {
      messageText = messageText.slice(0, 20) + "...";
    }
    const sender = lastMessage.user._id === userId ? "You" : lastMessage.user.username;
    return `${sender}: ${messageText}`;
  }

  const handleOpenMenu = () => {
    sidebarMenuButtonRef.current.classList.toggle("active");
    sidebarMenuRef.current.classList.toggle("active");
    clearSearchBar();
  };

  return (
    <div className="sidebar">
      <div className="newChatContainer" ref={newChatContainerRef}>
        <NewChatRoom closePrompt={closePrompt} />
      </div>
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          <img src="https://placehold.co/100x100" alt="Avatar" />
        </div>
        <div className="sidebar-header-buttons">
          <img src={Bell} alt="Notifications" />
          {/*<img src={NewChat} alt="NewChat" onClick={() => handleNewChatPrompt()}/>*/}
          <span ref={sidebarMenuButtonRef} className="sidebar-menu-button" onClick={() => handleOpenMenu()}>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
          </span>
          {/*<img src={Menu} alt="Menu" onClick={() => handleOpenMenu()} />*/}
        </div>
      </div>
      <div className="sidebar-upper">
        <div className="sidebar-search-bar active" onClick={handleSearchBarClick}>
          <img src={Search} alt="Search" />
          <input type="text" placeholder="Search" ref={inputRef} />
        </div>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu-container active" ref={sidebarMenuRef}>
          <SidebarMenu
            toggleNewGroupPage={handleNewChatPrompt}
            handleSearchBarChange={handleSearchBarChange}
            toggleFindUsersPage={() => {}}
            toggleProfilePage={() => {}}
            toggleSettingsPage={() => {}}
            toggleLogOut={() => {}}
          />
        </div>
        <ul className="sidebar-chats">
          {!sidebarLoading ? sidebarChats.map((chatroom) => (
            <Link
              to={`/c/chat/${chatroom._id}`}
              className="sidebar-chat"
              key={chatroom._id}
            >
              <div className="chat-avatar">
                <img src="https://placehold.co/100x100" alt="Avatar" />
              </div>
              <div className="chat-details">
                <div className="chat-name">{chatroom.chatroomInfo.name}</div>
                <div className="chat-message last-message">
                  {chatroom.lastMessage ? generateLastMessage(chatroom.lastMessage) : "No messages yet"}
                </div>
              </div>
            </Link>
          )) : 
            <div className="no-chat-prompt">
              <p>No chats yet</p>
              <p onClick={handleNewChatPrompt}>Start a new chat</p>
            </div>
          }
          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;