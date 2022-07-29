import styles from './modules/Toolbar.module.css';

function Toolbar({ children, justify = 'flex-start' }) {
    return (
        <div className={styles.toolbar} style={{ justifyContent: justify }}>
            {children}
        </div>
    );
}

export default Toolbar;