const pool = require('../Database_config/db');

const bookmark = (req, res) => {
    // console.log('Request URL', req.url)
    // console.log('req.params:', req.params);
    // console.log('req.body:', req.body);
    // const postId = req.params.postId
    const  { post_id }  = req.params;
    const {bookmarked_by} = req.body;

    if(!post_id || !bookmarked_by) {
        console.log('Missing Field - post_id', post_id, 'bookmarked_by', bookmarked_by)
        return res.status(400).json({message: 'missing required fiels'})
    }
    const query = 'SELECT * FROM bookmarks WHERE post_id = ? AND bookmarked_by = ?';
   
    pool.query(query, [post_id, bookmarked_by], (err, results) => {
        console.log('Executing query',query, [post_id, bookmarked_by])
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: 'Error retrieving bookmarks'})};
        if (results.length > 0){
            console.log('Post already bookmarked. Sending response', )
            const removequery = 'DELETE FROM bookmarks WHERE post_id = ? AND bookmarked_by = ?'
            pool.query(removequery, [post_id, bookmarked_by], (error, results) => {
                if (error) {
                    console.log('Database error in remove query', error)
                    return res.status(500).json({ message: 'Error removing bookmark post'});
                }
                if (results) {
                    console.log('Post unliked successfully. Sending response')
                    return res.status(200).json({ message: 'bookmark removed successfully', data: results.affectedRows});}
            })
        } else{
   
        const insertquery = 'INSERT INTO bookmarks (post_id, bookmarked_by) VALUES (?, ?)';
        pool.query(insertquery, [post_id, bookmarked_by], (err, result) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ message: 'Error adding bookmark'})}
            if (result) return res.status(200).json({ message: 'Post Bookmarked successfully'})
        })
        }
    })
};

module.exports = {bookmark}