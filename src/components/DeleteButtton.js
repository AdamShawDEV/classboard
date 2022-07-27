import styles from './modules/DeleteButton.module.css';

function DeleteButton({ isDeleteEnabled, setIsDeleteEnabled }) {

    function onClickHandler() {
      return setIsDeleteEnabled(!isDeleteEnabled);
    }
  
    return (
      <button
        className={styles.toolbarButton}
        onClick={onClickHandler}
        style={{ backgroundColor: (isDeleteEnabled ? "red" : 'rgb(70, 82, 255)') }} >Delete Items</button>
    )
  }

  export default DeleteButton;