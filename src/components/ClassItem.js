import styles from "./modules/Classitem.module.css";
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { deleteRecord } from '../firebase';

function ClassItem({ nameOfClass, classId, isDeleteEnabled }) {
  const navigate = useNavigate();

  function deleteClass(e) {
    e.stopPropagation();

    deleteRecord(classId, "/classes");
  }

  return (
    <div className={styles.classCard} onClick={() => navigate(`/class/${classId}`)}>
      {isDeleteEnabled && <div className={styles.deleteButtonContainer} ><button
        className={styles.deleteButton}
        onClick={(e) => deleteClass(e)}><RiDeleteBin5Fill /></button></div>}
      <div className={styles.name} >{nameOfClass}</div>
    </div>);
};

export default ClassItem;