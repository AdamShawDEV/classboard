import StudentCard from "./StudentCard";
import styles from "./modules/StudentGrid.module.css";
import { useParams } from 'react-router-dom';
import { useRequestData, REQUEST_STATUS } from "./hooks/useRequestData";
import { useState, useEffect } from "react";
import { useAuth } from './hooks/AuthContext'
import Modal from "./Modal";

function AddStudentButton({ createRecord }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentName, setStudentName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newStudent = {
      name: studentName,
      points: 0
    };

    createRecord(newStudent);


    setStudentName("");
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add Student</button>
      <Modal handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        heading="Add New Student">
        <form onSubmit={event => handleSubmit(event)}>
          <label>Student Name</label>
          <input
            type="text"
            onChange={e => setStudentName(e.target.value)}
            value={studentName}
            placeholder="Enter name..."
            required
            autoFocus />
          <button type="submit" value="Submit">Submit</button>
        </form>
      </Modal>
    </>
  );
}

function ShareClassButton({ createRecord, classId }) {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareCode, setShareCode] = useState('');

  async function handleClick() {
    const rec = {
      owner: currentUser.uid,
      classId,
      isUsed: false,
      created: new Date(),
    };

    const docRef = await createRecord(rec, '/shareCodes/');
    setShareCode(docRef.id);
    setIsModalOpen(true);
    console.log(rec);
  }

  return (
    <>
      <button onClick={handleClick}>Share Class</button>
      <Modal
        handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        heading="Share Class">
          <p>Share code: <span>{shareCode}</span></p>
      </Modal>
    </>
  );
}

function StudentsToolbar({ createRecord, classId }) {
  return (
    <div className="toolBar">
      <AddStudentButton createRecord={createRecord} />
      <ShareClassButton createRecord={createRecord} classId={classId} />
    </div>
  )
}

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
      <button onClick={() => setTimerActive(true)}>
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

function Loading() {
  return (
    <div>Loading...</div>
  );
}

function StudentFooter() {
  return (
    <div className={styles.studentFooter}>
      <CountDownTimer />
    </div>
  );
}

function StudentGrid() {
  const [classInfo, setClassInfo] = useState({});
  const { currentUser } = useAuth();
  const classId = useParams();
  const {
    data,
    requestStatus,
    returnRecord,
    updateRecord,
    createRecord,
  } = useRequestData(`/classes/${classId.id}/students/`);

  useEffect(() => {
    const getRecord = async () => {
      const info = await returnRecord(classId.id, "/classes/");
      setClassInfo(info);
    };

    getRecord();
  }, []);

  // check if user has editing rights
  let canEdit = false;
  if (currentUser && classInfo?.editors) {
    const { uid } = currentUser;
    canEdit = classInfo.editors.includes(uid);
  }

  return (
    <>
      <main>
        {canEdit && <StudentsToolbar createRecord={createRecord} classId={classId.id} />}
        <div className={styles.studentGrid}>{requestStatus === REQUEST_STATUS.LOADING ? <Loading /> :
        requestStatus === REQUEST_STATUS.SUCCESS ?
          data.sort((a, b) => a.name > b.name).map((dataItem) => (
            <StudentCard key={dataItem.id}
              canEdit={canEdit}
              studentId={dataItem.id}
              studentName={dataItem.name}
              studentPoints={dataItem.points}
              updateRecord={updateRecord} />
          )) : <div>An error has occyrred...</div> }
        </div>
      </main>
      {canEdit && <StudentFooter />}
    </>
  );
}

export default StudentGrid;