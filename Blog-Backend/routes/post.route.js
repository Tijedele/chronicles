const express = require('express');
const{
    getAllPosts,
    createPost, 
    getAPost, 
    deletePost,
    searchPost,
    updatePost
} = require('../controllers/post.controller');
const protect = require('../middlewares/protect');

const postRoute = express.Router();

postRoute.get('/', getAllPosts);
postRoute.post('/create-post', protect, createPost);
postRoute.put('/:post_id', protect, updatePost);
postRoute.get('/:post_id', getAPost);
postRoute.get('/search/:search_text', searchPost);
postRoute.delete('/:post_id', protect, deletePost);

module.exports = postRoute