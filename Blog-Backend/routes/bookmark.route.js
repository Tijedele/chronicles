const express = require('express');

const {bookmark} = require('../controllers/bookmarks.controller')
const protect = require('../middlewares/protect');

const bookmarkRoute = express.Router();

bookmarkRoute.put('/:post_id',protect, bookmark)

module.exports = bookmarkRoute