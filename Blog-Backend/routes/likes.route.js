const express = require('express');
const protect = require('../middlewares/protect');
const { likePost, getlikedpost } = require('../controllers/likes.controller');


const likedPostRoute = express.Router();

likedPostRoute.post('/:post_id', protect, likePost)
likedPostRoute.get('/getlikes/:post_id', protect, getlikedpost)

module.exports = likedPostRoute;