import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL);

        socket.on('userUpdate', (updatedUserData) => {
            setUser(updatedUserData);
            localStorage.setItem('user', JSON.stringify(updatedUserData));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
