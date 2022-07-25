import LoginButton from './LoginButton';
import { useState } from 'react';
import { useAuth } from './hooks/AuthContext';
import styles from './modules/UserControl.module.css';
import Modal from './Modal';

function UserBadge() {
    const { currentUser, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function cancel(e) {
        e.stopPropagation();

        setIsModalOpen(false);
    }

    return (
        <div onClick={() => setIsModalOpen(true)} className={styles.loggedIn}>
            <div className={styles.userName}>{currentUser?.displayName}</div>
            <img src={currentUser?.photoURL} className={styles.userImage} />
            <Modal handleClose={() => setIsModalOpen(false)}
                isOpen={isModalOpen}
                heading="Logout?">
                <div className={styles.buttonBox}>
                    <button className={styles.button}
                        onClick={() => logout()}>Logout</button>
                    <button className={styles.button}
                        onClick={(e) => cancel(e)} >Cancel</button>
                </div>
            </Modal>
        </div>
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

