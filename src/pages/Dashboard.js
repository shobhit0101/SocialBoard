// Dashboard
// here all the boards are displayed using difflerent filters 
// used a navbar component

import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import styles from "../assets/styles/Dashboard/dashboard.module.css";
import BoardCard from "../components/BoardCard";
import BoardContext from "../Context/BoardContext";

const Dashboard = () => {

    const { boards, searchQuery, filteredBoards } = useContext(BoardContext);
    return <>
        <div >
            <Navbar />
            <p className={styles.MyBoardText}>My Board</p>
            <div className={styles.dashboard_container}>
                {searchQuery ? (
                    filteredBoards.map((board) => (
                        <BoardCard key={board.id} board={board}></BoardCard>
                    ))
                ) : (
                    boards.map((board) => (
                        <BoardCard key={board.id} board={board}></BoardCard>
                    ))
                )}
            </div>

        </div>

    </>
};

export default Dashboard;