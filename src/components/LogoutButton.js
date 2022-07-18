import React from "react";
import { useAuth } from './hooks/AuthContext';

function LogoutButton() {
    const { logout } = useAuth();

    return (
        <button onClick={() => logout()}
        >
            Log Out
        </button>
    );
}

export default LogoutButton;