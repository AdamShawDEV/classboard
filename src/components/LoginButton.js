import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/');
    }

    return(
        <button onClick={() => redirectToLogin()} >
            Teacher Login
        </button>
    );
}

export default LoginButton;