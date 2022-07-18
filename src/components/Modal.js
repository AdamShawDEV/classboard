import React from "react";
import Portal from "./Portal";
import { RiCloseLine } from 'react-icons/ri';
import styles from "./modules/Modal.module.css";

function Modal({ children, heading,  isOpen, handleClose }) {
    React.useEffect(() => {
        const closeOnExcapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnExcapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnExcapeKey);
        };
    })

    const handleClick = e => {
        e.stopPropagation();

        handleClose();
    }


    if (!isOpen) return null;

    return (
        <Portal wrapperId={"react-portal-modal-container"}>
            <div className={styles.darkBG}>
                <div className={styles.centered}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading} >{heading}</h5>
                        </div>
                        <button onClick={handleClick} className={styles.closeBtn}>
                            <RiCloseLine style={{ marginBottom: "-3px" }} />
                        </button>
                        <div className={styles.modalContent}>
                            {children}
                        </div>
                        <div className={styles.modalActions}>
                            <div className={styles.actionsContainer}>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={handleClick}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal >
    );
}

export default Modal;