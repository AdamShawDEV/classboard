import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useAuth } from './hooks/AuthContext'
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
   const {currentUser, loading, logout } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  console.log('on the dashboard');

  useEffect(() => {
    if (loading) return;
    if (!currentUser) navigate("/");
  }, [currentUser, loading]);

  return (
    <div className={styles.dashboard}>
       <div className={styles.dashboard__container}>
        Logged in as
         <div>{currentUser?.displayName}</div>
         <div>{currentUser?.email}</div>
         <div><img src={currentUser?.photoURL} /></div>
         <button className={styles.dashboard__btn} onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;