
// generate protected route for user

import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const useAuth = () => {
    const user = localStorage.getItem('user');
    return { user };
};

const AuthRoute = ({ element, ...rest }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/a/login" />;
};

export const Auth = ({ children }) => {
    console.log('Auth ', children);
    return (
        <AuthRoute element={children} />
    );
};