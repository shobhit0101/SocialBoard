// BoardCard.js


import React, { useRef, useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { useDetectOutsideClick } from "./UseDetectOutsideClick";
import styles from "../assets/styles/BoardCard/BoardCard.module.css"
import DotIcon from "../assets/images/DotsVerticalOutlined.svg"
import Pencil from "../assets/images/PencilLineOutlined.svg"
import DeleteIcon from "../assets/images/DeleteOutlined.svg"
import CreateBoardModal from "./CreateBoardModal";
import closeButton from "../assets/images/CloseButton.svg"
import BoardContext from "../Context/BoardContext";

const BoardCard = ({ board }) => {

    // states of modal
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // colors array of objects for taking inputs of different colors for board
    const colors = [
        {
            bg: "#A7F0F9",
            stroke: "#23856D",
        },
        {
            bg: "#C5C5FC",
            stroke: "#4D4DFF",
        },
        {
            bg: "#FECFD8",
            stroke: "#FF1A8C",
        },
        {
            bg: "#FFCC66",
            stroke: "#FF8C00",
        }
    ]

    const { setBoards } = useContext(BoardContext);

    // toogle color 
    const handleColorClick = (color) => {
        setUpdatedColor(color);
    }

    // states for board field
    const [updatedTitle, setUpdatedTitle] = useState(board.title);
    const [updatedColor, setUpdatedColor] = useState(board.color);

    // Edit board Logic
    const editBoard = (id, updatedTitle, updatedColor) => {
        setBoards((prevBoards) =>
            prevBoards.map((board) =>
                board.id === id ? { ...board, title: updatedTitle, color: updatedColor } : board
            )
        );
    };

    // delete board logic
    const deleteBoard = (id) => {
        setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    };

    // saving edit modal form
    const handleSave = () => {
        editBoard(board.id, updatedTitle, updatedColor);
        closeModal();
    };

    //  passing id to delete that particular board
    const handleDelete = () => {
        deleteBoard(board.id);
    };

    // ref for dropdown containing edit and delete button
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);


    return <>
        <div className={styles.BoardCard_container}>
            <Link to={`/board/${board.id}`} className={styles.link_tag}>
                <div className={styles.BoardCard_item1} style={{ backgroundColor: board.color }}></div>
                <div className={styles.BoardCard_item2}>
                    <p className={styles.BoardCard_title}>
                        {board.title}
                    </p>
                </div>
            </Link>
            <div className={styles.outside_container} ref={dropdownRef}>
                <div className={styles.BoardCard_item3} onClick={onClick} >
                    <img src={DotIcon} alt="" className={styles.dots} />
                </div>
                <div className={isActive ? `${styles.dropdown_container_isActive}` : `${styles.dropdown_container_isInActive}`}>
                    <div className={styles.dropdown_menu}>
                        <div className={styles.edit_dropdown} onClick={openModal}>
                            <img src={Pencil} alt="" className={styles.pencil} />
                            <p>Edit</p>
                        </div>
                        <div className={styles.delete_dropdown} onClick={handleDelete}>
                            <img src={DeleteIcon} alt="" className={styles.deleteIcon} />
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
            <CreateBoardModal isOpen={modalOpen} onClick={closeModal} editBoard={editBoard}
                deleteBoard={deleteBoard}>
                <div className={styles.modal_header}>
                    <p className={styles.modal_header_text}>Edit your name for your board</p>
                    <img className={styles.closeButtonImg} src={closeButton} alt="" onClick={closeModal} />
                </div>
                <form onSubmit={handleSave}>
                    <input type="text" className={styles.Board_title_input} value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)} required />
                    <p className={styles.postColor_text}>Select post color</p>
                    <p className={styles.postColor_text2}>Here are some templates to help you get started</p>
                    <div className={styles.colors_container}>
                        {colors.map((color, index) => (
                            <span className={styles.dot} key={index} style={{
                                backgroundColor: color.bg,
                                border: color.bg === updatedColor ? `1px solid ${color.stroke}` : 'none',
                                cursor: 'pointer'
                            }}
                                onClick={() => handleColorClick(color.bg)}
                            ></span>
                        ))}
                    </div>
                    <button type="submit" className={styles.modal_create_button}>
                        <p>Save Board</p>
                    </button>
                </form>
            </CreateBoardModal>
        </div>

    </>
};
export default BoardCard;   