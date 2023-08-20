// CreateBoardModal.js
// modal parent component
// It takes the argument children and shows the content

import React from "react";
import styles from "../assets/styles/CreateBoardModal/CreateBoardModal.module.css"

const CreateBoardModal = ({ isOpen, children }) => {
    if (!isOpen) return null;
    return <>
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    </>
};
export default CreateBoardModal;
