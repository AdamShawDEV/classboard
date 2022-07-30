import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './modules/LoginButton.module.css';

function LoginButton() {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/');
    }

    return (
        <button className={styles.button} onClick={() => redirectToLogin()} >
                Teacher Login
        </button>
    );
}

export default LoginButton;