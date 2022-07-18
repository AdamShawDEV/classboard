import { useAuth } from './hooks/AuthContext';
import { Route, useNavigate } from 'react-router-dom';
import { Component, useEffect, useState } from 'react';


function ProtectedRoute({ component, redirect }) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            navigate(redirect);
        }
    }, [currentUser]);

    return (
        <>
            {currentUser && component}
        </>
    );
}

export default ProtectedRoute;