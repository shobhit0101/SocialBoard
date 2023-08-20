// Navbar.js
// navbar component for dashboard where all the boards are shown
// contains modal for create  board

import React, { useContext, useState } from "react";
import styles from '../assets/styles/Navbar/navbar.module.css'
import logo1 from '../assets/images/Subtract.svg'
import logo2 from '../assets/images/Group.svg'
import addLogo from '../assets/images/AddOutlined.svg'
import searchIcon from '../assets/images/SearchOutlined.svg'
import CreateBoardModal from "./CreateBoardModal";
import closeButton from "../assets/images/CloseButton.svg"
import BoardContext from "../Context/BoardContext";

const Navbar = () => {

    // modal states
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // colors array of object used in taking input while eding board 
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
            bg: "#FFAEC0",
            stroke: "#FF1A8C",
        },
        {
            bg: "#FFCC66",
            stroke: "#FF8C00",
        }
    ]
    // context api for board
    const { title, activeColor, setTitle, setActiveColor, boards, setBoards, searchQuery, setSearchQuery,
        setFilteredBoards, } = useContext(BoardContext);

    // search filter , that filter out board on the basis of title
    const handleSearch = () => {
        const filtered = boards.filter((board) =>
            board.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBoards(filtered);
    };

    // toogle color logic
    const handleColorClick = (color) => {
        setActiveColor(color);
    }

    // create board logic
    const addBoard = (title, color) => {
        const newBoard = { id: Date.now(), title, color };
        setBoards((prevBoards) => [...prevBoards, newBoard]);
    };

    // submit form logic
    const handleSubmit = (event) => {
        event.preventDefault();
        addBoard(title, activeColor);
        closeModal();
    };

    // triggering search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearch();
    };

    return <>
        <div className={styles.navbar_container}>
            <div className={styles.logo_container}>
                <img src={logo1} alt="" className={styles.go_back_logo} />
                <img src={logo2} alt="" />
            </div>

            <div className={styles.mini_container}>
                <div className={styles.searchBar_container}>
                    <img src={searchIcon} className={styles.searchIcon} alt="" />
                    <input type="text" className={styles.searchBar} placeholder="Search..." value={searchQuery}
                        onChange={(e) => handleSearchChange(e)}
                    />
                </div>
                <div className={styles.CreateNewBoardButton} onClick={openModal}>
                    <img src={addLogo} alt="" className={styles.plus_logo} />
                    <p>Create New Board</p>
                </div>
                <CreateBoardModal isOpen={modalOpen} onClick={closeModal} addBoard={addBoard}>
                    <div className={styles.modal_header}>
                        <p className={styles.modal_header_text}>Add a name for your board</p>
                        <img className={styles.closeButtonImg} src={closeButton} alt="" onClick={closeModal} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className={styles.Board_title_input} value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <p className={styles.postColor_text}>Select post color</p>
                        <p className={styles.postColor_text2}>Here are some templates to help you get started</p>
                        <div className={styles.colors_container}>
                            {colors.map((color, index) => (
                                <span className={styles.dot} key={index} style={{
                                    backgroundColor: color.bg,
                                    border: color.bg === activeColor ? `1px solid ${color.stroke}` : 'none',
                                    cursor: 'pointer'
                                }}
                                    onClick={() => handleColorClick(color.bg)}
                                ></span>
                            ))}
                        </div>
                        <button type="submit" className={styles.modal_create_button}>
                            <p>Create Board</p>
                        </button>
                    </form>
                </CreateBoardModal>
            </div>
        </div>
    </>
};
export default Navbar;