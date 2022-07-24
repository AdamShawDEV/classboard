import React from "react";
import Logo from "./logo.png";
import UserControl from "./UserControl";
import styles from './modules/Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.pageTitle}>
        <Link to='/' >
          <img alt="logo" src={Logo} className={styles.logo} />
        </Link>
      </div>
      <UserControl />
    </header>
  );
}

export default Header;