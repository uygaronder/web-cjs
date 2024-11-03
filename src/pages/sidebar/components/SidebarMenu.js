import React from 'react';

import '../css/SidebarMenu.css';

const SidebarMenu = ({ 
    toggleNewGroupPage,
    toggleNewChatPage,
    toggleFindUsersPage,
    toggleProfilePage,
    toggleSettingsPage,
    toggleLogOut
 }) => {
    console.log(toggleNewGroupPage);

    return (
        <div className="sidebar-menu">
            <ul className='sidebar-menu-buttons'>
                <li onClick={() => toggleNewChatPage() }>New Chat</li>
                <li onClick={() => toggleNewGroupPage() }>New Chatroom</li>
                <li onClick={() => toggleFindUsersPage() }>Find Users</li>
            </ul>
            <ul className='sidebar-menu-buttons'>
                <li onClick={() => toggleProfilePage() }>Profile</li>
                <li onClick={() => toggleSettingsPage() }>Settings</li>
                <li onClick={() => toggleLogOut() }>Log Out</li>
            </ul>
        </div>
    );
};

export default SidebarMenu;