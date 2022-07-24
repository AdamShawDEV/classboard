import styles from "./modules/Classitem.module.css";
import { useNavigate } from 'react-router-dom';

function ClassItem({ nameOfClass, classId }) {
    const navigate = useNavigate();
    
    return (
      <div className={styles.classCard} onClick={() => navigate(`/class/${classId}`)}>
        <div className={styles.name} >{nameOfClass}</div>
      </div>);
  };

  export default ClassItem;