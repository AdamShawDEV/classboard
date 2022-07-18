import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext";
import styles from "./modules/Reset.module.css";

function Reset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { currentUser, loading, sendPasswordReset } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (currentUser) navigate("/dashboard");
  }, [currentUser, loading]);

  return (
    <div className={styles.reset}>
      <div className={styles.reset__container}>
        <input
          type="text"
          className={styles.reset__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className={styles.reset__btn}
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Reset;