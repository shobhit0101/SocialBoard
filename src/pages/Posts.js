// post.js
// here all the post related to a particular board having some board id is displayed
// used multiple components like navbar , postcard CreateBoardModal 
// Modal for create post is also present here
// used a unique id generataor package to assign a unique id to each post
// implemented create Edit and Delete fuctionality
// uploading image logic is also here
// searching logic
// like post
// bookmark post



import React, { useContext, useState, useEffect } from "react";
import PostNavbar from "../components/PostNavbar";
import styles from "../assets/styles/Posts/posts.module.css"
import AddButton from "../assets/images/AddOutlined.svg"
import emptyState from "../assets/images/journal empty illo.svg"
import CreateBoardModal from "../components/CreateBoardModal";
import closeButton from "../assets/images/CloseButton.svg"
import gallery from "../assets/images/ImageSquareOutlined.svg"
import PostCard from "../components/PostCard";
import { useParams } from 'react-router-dom';
import BoardContext from "../Context/BoardContext";
import PostContext from "../Context/PostContext";
import { v4 as uuidv4 } from 'uuid';


const initialNewPost = {
    id: '',
    boardId: '',
    title: '',
    description: '',
    image: '',
    isBookmarked: false,
    isLiked: false,
    likedCount: 0,
    day: new Date().getDate(),
    month: new Date().toLocaleDateString('en-US', { month: 'long' }),
};


const Posts = () => {

    // for modal
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // board and post context api
    const { boards, bookmarked, setBookmarked } = useContext(BoardContext);
    const { posts, setPosts, searchPostQuerry, searchFilteredPosts, setSearchFilteredPosts, } = useContext(PostContext);

    const [newPost, setNewPost] = useState(initialNewPost);
    const [imageSrc, setImageSrc] = useState('');

    // for uploading image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImageSrc(url);
    };

    const { id } = useParams();

    // for Creating Post
    const handleAddPost = (e) => {
        e.preventDefault();
        const postWithBoardId = { ...newPost, boardId: board.id, id: uuidv4(), image: imageSrc };
        const updatedPosts = [...posts, postWithBoardId];
        setPosts(updatedPosts);
        setNewPost(initialNewPost);
        closeModal();
        console.log(posts);
    };

    // here i ma making a state of board 
    const [board, setBoard] = useState({});
    useEffect(() => {
        const selectedBoard = boards.find((board) => board.id === parseInt(id));
        setBoard(selectedBoard);
    }, [boards, id]);

    // logic for toggle bookmarked
    const [showBookmarked, setShowBookmarked] = useState(false);
    const toggleShowBookmarked = () => {
        setBookmarked(!bookmarked);
        setShowBookmarked(!showBookmarked);
    };
    // posts having same board id
    const filteredPosts = posts.filter((post) => post.boardId === board.id);
    // bookmarked post filter
    const filteredBookmarkedPost = showBookmarked
        ? filteredPosts.filter((post) => post.isBookmarked)
        : filteredPosts;

    // search  function that gives filtered post based on title
    const handleSearch = () => {
        const filtered = filteredPosts.filter((post) =>
            post.title.toLowerCase().includes(searchPostQuerry.toLowerCase())
        );
        console.log(filtered);
        setSearchFilteredPosts(filtered);
        // setSearchBarOpen(!searchBarOpen);

    };
    // like post toggle logic
    const handleLikeToggle = (postId) => {
        setPosts((prevPosts) => {
            return prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, isLiked: !post.isLiked, likedCount: post.isLiked ? post.likedCount - 1 : post.likedCount + 1 }
                    : post
            );
        });
    };

    // bookmark post  toggle logic
    const handleBookmarkedToggle = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
            )
        );
    };

    // logic to find length of post array, if array is empty then no content screen is shown and if not then post card is displayed 
    const boardIdToCheck = board.id;
    const postsInBoard = posts.filter(post => post.boardId === boardIdToCheck);

    // logic to give board  background color 
    const bgColor = board.color;
    const dynamicBGcolor = {
        backgroundColor: bgColor,
    };

    return <>
        <div className={styles.post_parent_container}>
            <PostNavbar board={board} toggleShowBookmarked={toggleShowBookmarked} onSearch={handleSearch} />
            <div className={styles.posts_container} style={dynamicBGcolor} >
                <div className={styles.posts_header}>
                    {postsInBoard.length === 0 ? (
                        <p className={styles.your_post_text}>Your Posts</p>
                    ) : (
                        <div></div>
                    )}
                    <div className={styles.create_new_post_button} onClick={openModal}>
                        <img src={AddButton} alt="" />
                        <p className={styles.create_new_post_text}>Create New Post</p>
                    </div>
                </div>
                {postsInBoard.length === 0 ? (
                    <div className={styles.empty_state_container}>
                        <img src={emptyState} alt="" />
                        <p className={styles.nothing_here_text}>Nothing here yet</p>
                        <p className={styles.empty_state_text2}>Create your first post by clicking on the '+' button above</p>
                    </div>
                ) : (
                    <div className={styles.post_card_container}>
                        {searchPostQuerry ? (
                            searchFilteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} onLikeToggle={handleLikeToggle} onBookmarkedToggle={handleBookmarkedToggle} />
                            ))
                        ) : (
                            filteredBookmarkedPost.map((post) => (
                                <PostCard key={post.id} post={post} onLikeToggle={handleLikeToggle} onBookmarkedToggle={handleBookmarkedToggle} />
                            ))
                        )}
                    </div>
                )}
            </div>
            <CreateBoardModal isOpen={modalOpen} onClick={closeModal}>
                <div className={styles.post_modal_container}>
                    <div className={styles.post_modal_header}>
                        <p className={styles.create_a_post_text}>Create a post</p>
                        <img src={closeButton} alt="" onClick={closeModal} className={styles.closeButton} />
                    </div>
                    <p className={styles.create_post_header_text2}>write something for your post</p>

                    <p className={styles.subject_text}>Subject</p>
                    <form onSubmit={handleAddPost}>
                        <input type="text" className={styles.subject_input_box} value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} required />
                        <label class={styles.custom_file_input} for="file">
                            <img src={gallery} alt="" />
                            <p className={styles.add_your_image_text}>Add your image</p>
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} required   ></input>
                        <div className={styles.borderline}></div>

                        <div className={styles.input_container2}>
                            <p className={styles.whatsOnMind_text}>What's on your mind</p>
                            <div className={styles.large_input_container} >
                                <input type="text" className={styles.whatsOnMind_input} placeholder="Type here"
                                    value={newPost.description}
                                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                                    required />
                            </div>
                        </div>

                        <button className={styles.publish_button} >
                            <p className={styles.publish_text}>Publish</p>
                        </button>
                    </form>
                </div>
            </CreateBoardModal>
        </div>
    </>
};

export default Posts;