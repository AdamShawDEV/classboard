import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth } from './hooks/AuthContext';
import styles from './modules/UserControl.module.css';

function UserBadge() {
    const { currentUser } = useAuth();

    return (
        <>
            <div className={styles.userName}>{currentUser?.displayName}</div>
            <img src={currentUser?.photoURL} className={styles.userImage} />
            <LogoutButton />
        </>
    );
}

function UserControl() {
    const { currentUser } = useAuth();

    return (
        <div className={styles.userContainer}>
            {currentUser ? <UserBadge /> : <LoginButton />}
        </div>
    );
}

export default UserControl;

