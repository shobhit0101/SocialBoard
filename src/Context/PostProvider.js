// PostProvider.js
// post context api's provider

import React, { useState } from 'react';
import PostContext from './PostContext';
import postsData from '../data/PostData';

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(postsData);
    const [searchPostQuerry, setsearchPostQuerry] = useState('');
    const [searchFilteredPosts, setSearchFilteredPosts] = useState([]);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    return (
        <PostContext.Provider value={{
            posts, setPosts,
            searchPostQuerry, setsearchPostQuerry,
            searchFilteredPosts, setSearchFilteredPosts,
            searchBarOpen, setSearchBarOpen,
        }}>
            {children}
        </PostContext.Provider>
    );
}

export default PostProvider;