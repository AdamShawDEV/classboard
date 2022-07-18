import ClassItem from "./ClassItem";
import styles from "./modules/ClassGrid.module.css";
import { useRequestData, REQUEST_STATUS } from "./hooks/useRequestData";
import { useAuth } from './hooks/AuthContext';
import { useEffect, useState } from 'react';
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

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
        <button onClick={() => setIsModalOpen(true)}>Add Class</button>
        <Modal handleClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          heading="Add New Class">
          <form onSubmit={event => handleSubmit(event)}>
            <label>Class Name</label>
            <input 
            type="text"
            onChange={e =>setClassName(e.target.value)}
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
    } = useRequestData("/classes", {prop: "editors", condition: "array-contains", value: currentUser?.uid});
    const navigate = useNavigate();

    if (requestStatus === REQUEST_STATUS.FAILURE) return <div>An error has occyrred...</div>;

    return (
        <>
            <main>
                <div>
                    <AddClassButton createRecord={createRecord} userId={currentUser?.uid} />
                </div>
                <div className={styles.classGrid}>
                    {data.sort((a,b) => a.name > b.name).map((dataItem, idx) => (
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