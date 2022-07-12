import { useAuth } from './hooks/AuthContext';
import { Route, useNavigate } from 'react-router-dom';
import { Component, useEffect, useState } from 'react';


function ProtectedRoute({ component, redirect }) {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated()) {
            setIsAuthorized(true);
        } else {
            navigate(redirect);
        }
    });

    return (
        <>
            {isAuthorized && component}
        </>
    );
}

export default ProtectedRoute;