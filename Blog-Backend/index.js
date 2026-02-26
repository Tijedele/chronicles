const express = require('express');
require('dotenv').config()
const cors = require('cors');
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const bookmarkRoute = require('./routes/bookmark.route');
const likedPostRoute = require('./routes/likes.route');
const commentPostRoute = require('./routes/comments.route');
const followerRoute = require('./routes/followers.route');
const imageRoute = require('./routes/post.images.route');

const app = express();

app.use(express.urlencoded({ extended:true}))
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

const port = process.env.PORT
app.use('/users', userRoute)
app.use('/posts', postRoute);
app.use('/bookmarks', bookmarkRoute);
app.use('/likes', likedPostRoute);
app.use('/comments', commentPostRoute);
app.use('/follow', followerRoute);
app.use('/uploads', imageRoute);
app.listen( port, ()=> console.log('server listing on ', port));