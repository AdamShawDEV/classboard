import { useState, useEffect } from 'react';
import styles from './modules/CountDownTimer.module.css';
import Modal from './Modal';

function CountDownTimer() {
    const [timerActive, setTimerActive] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [inputSeconds, setInputSeconds] = useState("");
  
    useEffect(() => {
      if (secondsRemaining > 0) {
        const timerId = setTimeout(() => {
          setSecondsRemaining(secondsRemaining - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    });
  
    function onSubmit(e) {
      e.preventDefault();
  
      setSecondsRemaining(inputSeconds);
    }
  
    function handleClose() {
      setTimerActive(false);
      setInputSeconds();
      setSecondsRemaining(0);
    }
  
    return (
      <>
        <button onClick={() => setTimerActive(true)}
          className={styles.toolbarButton}>
          Count Down Timer
        </button>
        <Modal
          handleClose={handleClose}
          isOpen={timerActive}
          heading="Timer">
          {secondsRemaining === 0 ?
            <form onSubmit={(e) => onSubmit(e)} >
              <input type="number"
                onChange={(e) => setInputSeconds(e.target.value)}
                value={inputSeconds} required
                placeholder="Enter seconds" />
              <input type="submit" value="Submit" />
            </form>
            :
            <div className={styles.countdownNumber}>{secondsRemaining}</div>
          }
        </Modal>
      </>
    );
  }

  export default CountDownTimer;