import React from "react";
import Logo from "./logo.png";
import UserControl from "./UserControl";
import styles from './modules/Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.pageTitle}>
        <img alt="logo" src={Logo} className={styles.logo} />
      </div>
      <UserControl />
    </header>
  );
}

export default Header;