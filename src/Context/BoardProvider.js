// BoardProvider.js
// Boards Context api's provider

import React, { useState } from 'react';
import BoardContext from "../Context/BoardContext";
import BoardsData from '../data/BoardsData';

const BoardProvider = ({ children }) => {

    const [title, setTitle] = useState('');
    const [activeColor, setActiveColor] = useState('#A7F0F9');
    const [boards, setBoards] = useState(BoardsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBoards, setFilteredBoards] = useState([]);
    const [bookmarked, setBookmarked] = useState(false);


    return (
        <BoardContext.Provider value={{
            title, setTitle,
            activeColor, setActiveColor,
            boards, setBoards,
            searchQuery, setSearchQuery,
            filteredBoards, setFilteredBoards,
            bookmarked, setBookmarked,
        }}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardProvider;

