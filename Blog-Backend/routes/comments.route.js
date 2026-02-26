const express = require('express');
const commentPost = require('../controllers/comments.controller');

const commentPostRoute = express.Router();

commentPostRoute.post('/:post_id', commentPost);

module.exports = commentPostRoute;
