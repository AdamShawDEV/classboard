import StudentCard from "./StudentCard";
import styles from "./modules/StudentGrid.module.css";
import { useParams } from 'react-router-dom';
import { useRequestData, REQUEST_STATUS } from "./hooks/useRequestData";
import { useState, useEffect, useContext } from "react";
import { useAuth } from './hooks/AuthContext'
import Modal from "./Modal";
import DeleteButton from "./DeleteButtton";
import Loading from "./Loading";
import { ClassNameContext } from "./hooks/ClassNameContext";
import Toolbar from "./Toolbar";
import CountDownTimer from "./CountDownTimer";

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
      <button onClick={() => setIsModalOpen(true)}
        className={styles.toolbarButton}>Add Student</button>
      <Modal handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        heading="Add New Student">
        <form onSubmit={event => handleSubmit(event)}
          className={styles.addStudentForm}>
          <label>Student Name:</label>
          <input
            type="text"
            onChange={e => setStudentName(e.target.value)}
            value={studentName}
            placeholder="Enter name..."
            required
            autoFocus />
          <div>
            <button type="submit" value="Submit">Submit</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
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
  }

  return (
    <>
      <button onClick={handleClick}
        className={styles.toolbarButton}>Share Class</button>
      <Modal
        handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        heading="Share Class">
        <p className={styles.shareMessage}>Copy and send the code below to share this class with another teacher.</p>
        <div className={styles.shareHeading}>Share code:</div>
        <span className={styles.shareCode}>{shareCode}</span>
      </Modal>
    </>
  );
}

function StudentGrid() {
  const [classInfo, setClassInfo] = useState({});
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const { currentUser } = useAuth();
  const { setCurrentClassName } = useContext(ClassNameContext);

  const classId = useParams();
  const {
    data,
    requestStatus,
    returnRecord,
    updateRecord,
    createRecord,
    deleteRecord,
  } = useRequestData(`/classes/${classId.id}/students/`);

  useEffect(() => {
    const getRecord = async () => {
      const info = await returnRecord(classId.id, "/classes/");

      setClassInfo(info);
      setCurrentClassName(info.name);
    };

    getRecord();

    // remove class name from header
    return () => setCurrentClassName('');
  }, [classId.id]);

  // check if user has editing rights
  let canEdit = false;
  if (currentUser && classInfo?.editors) {
    const { uid } = currentUser;
    canEdit = classInfo.editors.includes(uid);
  }

  return (
    <>
      <main>
        {canEdit && <Toolbar>
          <AddStudentButton createRecord={createRecord} />
          <ShareClassButton createRecord={createRecord} classId={classId.id} />
          <DeleteButton isDeleteEnabled={isDeleteEnabled} setIsDeleteEnabled={setIsDeleteEnabled} />
        </Toolbar>}
        <div className={styles.studentGrid}>{requestStatus === REQUEST_STATUS.LOADING ? <Loading /> :
          requestStatus === REQUEST_STATUS.SUCCESS ?
            data.sort((a, b) => a.name > b.name).map((dataItem) => (
              <StudentCard key={dataItem.id}
                canEdit={canEdit}
                studentId={dataItem.id}
                studentName={dataItem.name}
                studentPoints={dataItem.points}
                updateRecord={updateRecord}
                isDeleteEnabled={isDeleteEnabled}
                deleteRecord={deleteRecord} />
            )) : <div>An error has occyrred...</div>}
        </div>
      </main>
      {canEdit && <Toolbar justify='center'>
        <CountDownTimer />
      </Toolbar>}
    </>
  );
}

export default StudentGrid;