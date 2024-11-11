import React, { createContext, useState, useEffect } from 'react';
import { userSocket } from '../socket';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        userSocket.on('connect', () => {
            console.log('User socket connected');
            userSocket.emit('requestUserUpdate');
        });

        userSocket.on('userUpdated', (updatedUserData) => {
            setUser(updatedUserData);
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            console.log('User updated');
        });

        return () => {
            userSocket.off('connect');
            userSocket.off('userUpdated');
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    const requestUserData = () => {
        userSocket.emit('requestUserUpdate');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, requestUserData }}>
            {children}
        </UserContext.Provider>
    );
};
