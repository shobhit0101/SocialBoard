// PosCard.js
// post card is created
// image upload logic
// edit post logic
// update post logic
// delete post logic

import React, { useRef, useState, useContext } from "react";
import styles from "../assets/styles/PostCard/post_card.module.css"
import trippleDot from "../assets/images/DotsVerticalOutlined.svg"
import Heart from "../assets/images/HeartOutlined.svg"
import HeartLiked from "../assets/images/_HeartLikeFilled.svg"
import { useDetectOutsideClick } from "./UseDetectOutsideClick";
import Pencil from "../assets/images/PencilLineOutlined.svg"
import DeleteIcon from "../assets/images/DeleteOutlined.svg"
import PostContext from "../Context/PostContext";
import CreateBoardModal from "../components/CreateBoardModal";
import closeButton from "../assets/images/CloseButton.svg"
import gallery from "../assets/images/ImageSquareOutlined.svg"
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs"



const initialNewPost = {
    id: Date.now(),
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


const PostCard = ({ post, onLikeToggle, onBookmarkedToggle }) => {

    // modal states
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // ref for dropdown containing edit and delete post button
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClickk = () => setIsActive(!isActive);

    // different states
    const { posts, setPosts } = useContext(PostContext);
    const [newPost, setNewPost] = useState(initialNewPost);
    const [editingPost, setEditingPost] = useState(null);
    const [imageSrc, setImageSrc] = useState('');

    // image upload logic
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImageSrc(url);
    };

    // Edit post logic
    const handleEditPost = (postId) => {
        openModal();
        const postToEdit = posts.find((post) => post.id === postId);
        setEditingPost(postToEdit);
        setNewPost(postToEdit);
    };

    // Update post logic
    const handleUpdatePost = (e) => {
        e.preventDefault();
        const updatedPost = { ...newPost, image: imageSrc };
        let updatedPosts = { ...posts, updatedPost };
        updatedPosts = posts.map((post) =>
            post.id === editingPost.id ? updatedPost : post
        );
        setPosts(updatedPosts);
        setEditingPost(null);
        setNewPost(initialNewPost);
        closeModal();
        setIsActive(false);
        console.log(posts);
    };

    // delete post logic
    const handleDeletePost = (postId) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
    };

    return <>
        <div className={styles.card_container}>
            <div className={styles.card_header}>
                <div className={styles.card_header_item1}>{post.title}</div>
                <div className={styles.card_header_item2}>
                    {post.isBookmarked ? (
                        <BsFillBookmarkFill className={styles.GoldenbookamrkIcon} onClick={() => onBookmarkedToggle(post.id)}></BsFillBookmarkFill>
                    ) : (
                        <BsBookmark className={styles.bookamrkIcon} onClick={() => onBookmarkedToggle(post.id)}></BsBookmark>
                    )}
                    <div className={styles.outside_container} ref={dropdownRef}>
                        <div onClick={onClickk}>
                            <img src={trippleDot} alt="" className={styles.TrippleDot} />
                        </div>
                        <div className={isActive ? `${styles.dropdown_container_isActive}` : `${styles.dropdown_container_isInActive}`}>
                            <div className={styles.dropdown_menu}>
                                <div className={styles.edit_dropdown} onClick={() => handleEditPost(post.id)}>
                                    <img src={Pencil} alt="" className={styles.pencil} />
                                    <p>Edit</p>
                                </div>
                                <div className={styles.delete_dropdown} onClick={() => handleDeletePost(post.id)}>
                                    <img src={DeleteIcon} alt="" className={styles.deleteIcon} />
                                    <p>Delete</p>
                                </div>
                                <CreateBoardModal isOpen={modalOpen} onClick={closeModal}>
                                    <div className={styles.post_modal_container}>
                                        <div className={styles.post_modal_header}>
                                            <p className={styles.create_a_post_text}>Edit your post</p>
                                            <img src={closeButton} alt="" onClick={closeModal} className={styles.closeButton} />
                                        </div>
                                        <p className={styles.create_post_header_text2}>write something for your post</p>

                                        <p className={styles.subject_text}>Subject</p>
                                        <form onSubmit={handleUpdatePost}>
                                            <input type="text" className={styles.subject_input_box} value={newPost.title}
                                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} required />

                                            <label class={styles.custom_file_input} for="file">

                                                <img src={gallery} alt="" />
                                                <p className={styles.add_your_image_text}>Add your image</p>

                                            </label>
                                            <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} required></input>
                                            <div className={styles.borderline_card}></div>

                                            <div className={styles.input_container2}>
                                                <p className={styles.whatsOnMind_text}>What's on your mind</p>
                                                <div className={styles.large_input_container} >
                                                    <input type="text" className={styles.whatsOnMind_input} placeholder="Type here"
                                                        value={newPost.description}
                                                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button className={styles.publish_button}  >
                                                <p className={styles.publish_text}>Save</p>
                                            </button>
                                        </form>
                                    </div>
                                </CreateBoardModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.date_text}>
                <p>{post.day}th {post.month}</p>
            </div>
            <img src={post.image} alt="no image" className={styles.uploadedImage} />
            <div className={styles.card_description}>
                {post.description}
            </div>
            <div className={styles.borderline}></div>
            <div className={styles.card_footer}>
                {post.isLiked ? (
                    <img src={HeartLiked} alt="HeartLiked" onClick={() => onLikeToggle(post.id)} className={styles.heart} />
                ) : (
                    <img src={Heart} alt="Default" onClick={() => onLikeToggle(post.id)} className={styles.heart} />
                )}
                <p className={styles.like_count_text}>{post.likedCount}</p>
            </div>

        </div>
    </>
};
export default PostCard;