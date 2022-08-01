import { useAuth } from './hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


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