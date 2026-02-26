const pool = require('../Database_config/db');

const commentPost = (req, res) => {
    const post_id = req.params.post_id;
    const comments = req.body.comment;
    const created_by = req.user_id;

    if(!post_id || !comments){
        return res.status(400).json({ message: 'Please fill all fields'});
    }
    const query = 'SELECT * FROM comments WHERE post_id = ? AND comments = ?';
    pool.query(query, [post_id, comments], (err, results) => {
        console.log('Executing query', query, [post_id, comments, created_by])
        if (err) {
            console.log('Database error in query', err)
            return res.status(500).json({ message: err?.message ?? 'Error retrieving posts'});
        }
        // Already commented, then remove comment
        if (results.length > 0) {
            console.log('Post already commented. Sending response', )
            const removequery = 'DELETE FROM comments WHERE post_id = ? AND comments = ?'
            pool.query(removequery, [post_id, comments], (error, results) => {
                if (error) {
                    console.log('Database error in remove query', error)
                    return res.status(500).json({ message: 'Error removing comment post'});
                }
                if (results) {
                    console.log('Comment removed successfully. Sending response')
                    return res.status(200).json({ message: 'comment removed successfully', data: results.affectedRows});}
            })
        } else {
            const insertquery = "INSERT INTO comments (comments, post_id) VALUES (?, ?)";
            pool.query(insertquery, [comments, post_id], (err, result) => {
            if (err) {
            return res
           .status(500)
           .json({ message: err.message?? 'Error creating comment'});
            } 
            if(result){
                return res.status(201).json({ message: 'Comment created successfully', data: { comments, post_id, commentId: result.insertId } });
            } else {
                res.status(400).json({ message: 'An error occurred'});
            }
        })
        }
    })  
}

module.exports = commentPost;