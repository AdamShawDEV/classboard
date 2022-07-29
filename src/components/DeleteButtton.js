import styles from './modules/DeleteButton.module.css';

function DeleteButton({ isDeleteEnabled, setIsDeleteEnabled }) {

    function onClickHandler() {
      return setIsDeleteEnabled(!isDeleteEnabled);
    }
  
    return (
      <button
        className={styles.toolbarButton}
        onClick={onClickHandler}
        style={isDeleteEnabled ? { backgroundColor:  "red" } : null} >Delete</button>
    )
  }

  export default DeleteButton;