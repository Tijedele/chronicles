const pool = require('../Database_config/db');

// Upload single image
const singleImage = (req, res) => {
    console.log(req.file);
    console.log(req.body);

    const {post_id} = req.body;
    console.log(post_id);


    const imgUrl = "uploads/" + req.file.filename;

    const query = 'INSERT INTO post_images (post_id, image_url) VALUES (?, ?)';
    pool.query(query, [Number(post_id), imgUrl], (err, result) => {
        if (err) {
            return res
           .status(500)
           .json(err.message?? 'Error uploading image');
        }
        if (result) {
            console.log('image uploaded successfully')
            return res
           .status(200)
           .json('Image Uploaded Successfully');
        } else{
            console.log('Image upload failed')
            return res.status(400).json('Faild to upload image')
        }
    });
};
const updateSingleImage = (req, res) => {
    const {post_id} = req.params;
    console.log(post_id);


    const imgUrl = "uploads/" + req.file.filename;

    const query = 'UPDATE post_images SET image_url = ? WHERE post_id = ?';
    pool.query(query, [imgUrl, Number(post_id)], (err, result) => {
        if (err) {
            return res
           .status(500)
           .json(err.message?? 'Error updating image');
        }
        if (result) {
            console.log('image updated successfully')
            return res
           .status(200)
           .json('Image updated Successfully');
        } else{
            console.log('Image update failed')
            return res.status(400).json('Faild to update image')
        }
    });
}
const multipleImages = (req, res) => {
    const images = req.files;
    console.log('line 30', images)
}

module.exports = {
    singleImage,
    multipleImages,
    updateSingleImage
};