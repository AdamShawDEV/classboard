import ClassItem from "./ClassItem";
import styles from "./modules/ClassGrid.module.css";
import { useRequestData, REQUEST_STATUS } from "./hooks/useRequestData";
import { useAuth } from './hooks/AuthContext';
import { useEffect, useState } from 'react';
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function AddClassWithCode({ returnRecord, updateRecord }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const { currentUser } = useAuth();

  function handleClick() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setShareCode('');
    setIsModalOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const shareData = await returnRecord(shareCode, '/shareCodes/');
    console.log(shareData);

    if (!shareData) {
      alert('invalud code');
      closeModal();
      return;
    }
    if (shareData.isUsed) {
      alert('Code has already been used.');
      closeModal();
      return;
    }

    const classRec = await returnRecord(shareData.classId, '/classes/');

    if (classRec.editors.includes(currentUser.uid)) {
      alert('Already added');
      setIsModalOpen(false);
      return;
    }

    const newEditors = { editors: [...classRec.editors, currentUser.uid] };
    updateRecord(shareData.classId, newEditors, '/classes/');
    updateRecord(shareCode, { isUsed: true }, '/shareCodes/');
  }

  return (
    <>
      <button onClick={handleClick}>Add Class With Code</button>
      <Modal handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        heading="Add Class With Code">
        <form onSubmit={event => handleSubmit(event)}>
          <label>Class Code</label>
          <input
            type="text"
            onChange={e => setShareCode(e.target.value)}
            value={shareCode}
            placeholder="Enter code..."
            required
            autoFocus />
          <button type="submit" value="Submit">Submit</button>
        </form>
      </Modal>
    </>
  );
}

function AddClassButton({ createRecord, userId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newClass = {
      name: className,
      owner: userId,
      editors: [userId],
    };
    try {
      createRecord(newClass);
    } catch (e) {
      console.log(e);
    }

    setClassName("");
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Creat New Class</button>
      <Modal handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        heading="Add New Class">
        <form onSubmit={event => handleSubmit(event)}>
          <label>Class Name</label>
          <input
            type="text"
            onChange={e => setClassName(e.target.value)}
            value={className}
            placeholder="Enter name..."
            required
            autoFocus />
          <button type="submit" value="Submit">Submit</button>
        </form>
      </Modal>
    </>
  );
}

function ClassGrid() {
  const { currentUser } = useAuth();
  const {
    data,
    requestStatus,
    createRecord,
    updateRecord,
    returnRecord
  } = useRequestData("/classes", { prop: "editors", condition: "array-contains", value: currentUser?.uid });
  const navigate = useNavigate();

  if (requestStatus === REQUEST_STATUS.FAILURE) return <div>An error has occyrred...</div>;

  return (
    <>
      <main>
        <div>
          <AddClassButton createRecord={createRecord} userId={currentUser?.uid} />
          <AddClassWithCode updateRecord={updateRecord} returnRecord={returnRecord} />
        </div>
        <div className={styles.classGrid}>
          {data.sort((a, b) => a.name > b.name).map((dataItem, idx) => (
            <ClassItem
              key={idx}
              nameOfClass={dataItem.name}
              classId={dataItem.id}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default ClassGrid;