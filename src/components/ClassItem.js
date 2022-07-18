import styles from "./modules/Classitem.module.css";
import { useNavigate } from 'react-router-dom';

function ClassItem({ nameOfClass, classId }) {
    const navigate = useNavigate();
    
    return (
      <div className={styles.studentCard} onClick={() => navigate(`/class/${classId}`)}>
        <div className={styles.studentName} >{nameOfClass}</div>
      </div>);
  };

  export default ClassItem;