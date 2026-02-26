const express = require('express');
const {
    singleImage,
    multipleImages
} = require('../controllers/post.images.controller');
const upload = require('../middlewares/multer');

const imageRoute = express.Router()

imageRoute.post('/image', upload.single('image'), singleImage)
// imageRoute.post('/image', upload.array('images', 5), multipleImages);

module.exports = imageRoute;