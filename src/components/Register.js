import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './hooks/AuthContext';
import styles from "./modules/Register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { currentUser,
    loading,
    registerWithEmailAndPassword,
    signInWithGoogle } = useAuth();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (currentUser) navigate("/classes");
  }, [currentUser, loading]);

  return (
    <main className={styles.register} >
      <h1 className={styles.title}>Teacher Registration</h1>
      <div className={styles.register__container} >
        <input
          type="text"
          className={styles.register__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={styles.register__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.register__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className={styles.register__btn} onClick={register}>
          Register
        </button>
        <button
          className={styles.register__google}
        onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </main>
  );
}

export default Register;