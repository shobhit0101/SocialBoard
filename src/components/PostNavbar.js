// PostNavbar.js
// navbar for posts where all the post of a board is displayed
// search bar toogle logic


import React, { useContext } from "react";
import styles from "../assets/styles/Navbar/postNavbar.module.css"
import vector from "../assets/images/Vector 266 (Stroke).svg"
import TIcon from "../assets/images/Fill 15.svg"
import SearchIcon from "../assets/images/SearchOutlined.svg"
import FillRed from "../assets/images/Fill 13.svg"
import { Link } from 'react-router-dom';
import BoardContext from "../Context/BoardContext";
import PostContext from "../Context/PostContext";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs"

const PostNavbar = ({ board, toggleShowBookmarked, onSearch }) => {

    // board context logic
    const { bookmarked, } = useContext(BoardContext);
    const { searchPostQuerry, setsearchPostQuerry, searchBarOpen, setSearchBarOpen, } = useContext(PostContext);

    // toogle search logic
    const toggleOpenSearchBar = () => {
        setSearchBarOpen(prev => !prev);
    };

    // taking event value and passing and triggering search
    const handleChange = (e) => {
        setsearchPostQuerry(e.target.value);
        onSearch();
    }

    return <>
        <div className={styles.postNavbar_container}>
            <div className={styles.logo_container}>
                <Link rel="stylesheet" to="/" >
                    <img src={vector} alt="" />
                </Link>
                <div className={styles.FillLogo_container}>
                    <img src={FillRed} alt="" className={styles.Fillred_background} />
                    <img src={TIcon} alt="" className={styles.TIcon} />
                </div>
                <p className={styles.postTitle}>{board.title}</p>
            </div>
            <div className={styles.buttons_container}>
                <div className={styles.rectangle}>
                    {searchBarOpen ? (
                        <div className={styles.searchBar_container} >
                            <img src={SearchIcon} className={styles.searchIcon} alt="" />
                            <input type="text" className={styles.searchBar} placeholder="Search..."
                                value={searchPostQuerry}
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                    ) :
                        <img src={SearchIcon} alt="" className={styles.SearchNavIcon} onClick={toggleOpenSearchBar} />
                    }

                </div>
                {bookmarked ? (
                    <div className={styles.Bookmark_container}>
                        <BsFillBookmarkFill className={styles.BlackbookamrkIcon} onClick={toggleShowBookmarked}></BsFillBookmarkFill>
                    </div>
                ) : (
                    <div className={styles.Bookmark_container}>
                        <BsBookmark className={styles.BookmarkIcon} onClick={toggleShowBookmarked}></BsBookmark>
                    </div>
                )}

            </div>
        </div>
    </>
};
export default PostNavbar;