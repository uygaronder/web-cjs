// generate protected route for user

import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const useAuth = () => {
    const user = localStorage.getItem('user');
    return { user };
};

const AuthProvider = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    console.log(user);
    return (
        <Route
        {...rest}
        render={(props) =>
            user ? <Component {...props} /> : <Navigate to="/login" />
        }
        />
    );
    };

export default AuthProvider;