import React, { useContext } from "react";
import Logo from "./logo.png";
import UserControl from "./UserControl";
import styles from './modules/Header.module.css';
import { Link } from 'react-router-dom';
import { ClassNameContext } from "./hooks/ClassNameContext";

function Header() {
  const { currentClassName } = useContext(ClassNameContext);

  return (
    <header className={styles.header}>
      <div className={styles.pageTitle}>
        <Link to='/' style={{ display: 'flex' }}>
          <img alt="logo" src={Logo} className={styles.logo} />
        </Link>
      </div>
      {currentClassName && <div className={styles.classNameStyle}>{currentClassName}</div>}
      <UserControl />
    </header>
  );
}

export default Header;