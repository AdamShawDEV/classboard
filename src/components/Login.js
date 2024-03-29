import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./modules/Login.module.css";
import { useAuth } from './hooks/AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logInWithEmailAndPassword,
    signInWithGoogle,
    currentUser,
    loading } = useAuth();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (currentUser) navigate("/classes");
  }, [loading, currentUser]);

  return (
    <main className={styles.login}>
      <h1 className={styles.title}>Teacher Login</h1>
      <div className={styles.login__container}>
        <input
          type="text"
          className={styles.login__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.login__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className={styles.login__btn}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className={styles.login__google} onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </main>
  );
}
export default Login;