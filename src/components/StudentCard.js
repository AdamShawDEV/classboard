import { useState, memo } from "react";
import Modal from "./Modal";
import styles from "./modules/StudentCard.module.css";
import { RiDeleteBin5Fill } from 'react-icons/ri'


const StudentCard = memo(({ studentId, studentName, studentPoints,
  canEdit, updateRecord, isDeleteEnabled, deleteRecord }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardClicked = () => {
    setIsModalOpen(true)
  };

  const closeModalFunction = () => {
    setIsModalOpen(false);
  };

  const onPointButtonClickFunction = (pointDiff) => {
    let points = studentPoints + pointDiff;

    updateRecord(studentId, { points, });
  }

  const deleteStudent = (e) => {
    e.stopPropagation();

    deleteRecord(studentId);
  };

  return (
    <div className={styles.studentCard} onClick={cardClicked}>
      {isDeleteEnabled && <div className={styles.deleteButtonContainer}><button
        className={styles.deleteButton}
        onClick={(e) => deleteStudent(e)}><RiDeleteBin5Fill /></button></div>}
      <div className={styles.points}>{studentPoints}</div>
      <div className={styles.studentName} >{studentName.slice(0, 8)}</div>
      <Modal handleClose={closeModalFunction}
        isOpen={isModalOpen && canEdit}
        heading="Add / Remove Points">
        <div className={styles.points}>{studentPoints}</div>
        <div className={styles.studentName} >{studentName}</div>
        <div className={styles.buttonBox}>
          <button className={styles.minusButton} onClick={() => onPointButtonClickFunction(-1)} >
            Remove Points
          </button>
          <button className={styles.plusButton} onClick={() => onPointButtonClickFunction(1)} >
            Add Points
          </button>
        </div>
      </Modal>
    </div>);
}, isStudentCardEqual);

function isStudentCardEqual(prevProps, newProps) {
  return prevProps.studentPoints === newProps.studentPoints &&
    prevProps.canEdit === newProps.canEdit &&
    prevProps.isDeleteEnabled === newProps.isDeleteEnabled;
}

export default StudentCard;