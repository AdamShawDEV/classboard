import ClassItem from "./ClassItem";
import styles from "./modules/ClassGrid.module.css";
import { useRequestData, REQUEST_STATUS } from "./hooks/useRequestData";
import { useAuth } from './hooks/AuthContext';
import { useContext, useState } from 'react';
import Modal from "./Modal";
import DeleteButton from "./DeleteButtton";
import Loading from "./Loading";
import Toolbar from "./Toolbar";

function AddClassWithCode({ returnRecord, updateRecord }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const { currentUser } = useAuth();

  function closeModal() {
    setShareCode('');
    setIsModalOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const shareData = await returnRecord(shareCode.trim(), '/shareCodes/');

    if (!shareData) {
      alert('Invalid code.');
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
      closeModal();
      return;
    }

    const newEditors = { editors: [...classRec.editors, currentUser.uid] };
    updateRecord(shareData.classId, newEditors, '/classes/');
    updateRecord(shareCode, { isUsed: true }, '/shareCodes/');
    closeModal();
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}
        className={styles.toolbarButton}>Add With Code</button>
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
  const [newClassName, setNewClassName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newClass = {
      name: newClassName,
      owner: userId,
      editors: [userId],
    };
    
    createRecord(newClass);
    setNewClassName("");
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}
        className={styles.toolbarButton}>Create Class</button>
      <Modal handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        heading="Add New Class">
        <form onSubmit={event => handleSubmit(event)}>
          <label>Class Name</label>
          <input
            type="text"
            onChange={e => setNewClassName(e.target.value)}
            value={newClassName}
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
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const {
    data,
    requestStatus,
    createRecord,
    updateRecord,
    returnRecord,
    deleteRecord,
  } = useRequestData("/classes", { prop: "editors", condition: "array-contains", value: currentUser?.uid });

  return (
    <>
      <main>
        <Toolbar>
          <AddClassButton createRecord={createRecord} userId={currentUser?.uid} />
          <AddClassWithCode updateRecord={updateRecord} returnRecord={returnRecord} />
          <DeleteButton isDeleteEnabled={isDeleteEnabled} setIsDeleteEnabled={setIsDeleteEnabled} />
        </Toolbar>
        <div className={styles.classGrid}>
          {requestStatus === REQUEST_STATUS.LOADING ? <Loading /> : requestStatus === REQUEST_STATUS.SUCCESS ?
            data.sort((a, b) => a.name > b.name).map((dataItem, idx) => (
              <ClassItem
                key={idx}
                nameOfClass={dataItem.name}
                classId={dataItem.id}
                isDeleteEnabled={isDeleteEnabled}
                deleteRecord={deleteRecord}
              />
            )) : <div>An error has occurred...</div>}
        </div>
      </main>
    </>
  );
}

export default ClassGrid;