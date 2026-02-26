const { parse } = require("dotenv");
const pool = require("../Database_config/db");

const likePost = (req, res) => {
  const post_id = req.params.post_id.trim();
  // console.log('post_id:', post_id, typeof post_id);
  const { liked_by, author_id } = req.body;
  console.log(author_id, liked_by, post_id);

  if (!post_id.trim() || liked_by === undefined || author_id === null) {
    console.log("Missing Field - post_id", post_id, "like_by", liked_by);
    return res
      .status(400)
      .json({ message: "Please provide post_id and liked_by" });
  }
  // Check if post has already been liked
  const query =
    "SELECT * FROM likes WHERE liked_posts_id = ? AND liked_by = ? ";
  pool.query(query, [post_id, liked_by], (err, results) => {
    console.log("Executing query", query, [post_id, liked_by]);
    if (err) {
      console.log("Database error in query", err);
      return res
        .status(500)
        .json({ message: err?.message ?? "Error retrieving likedposts" });
    }
    // Already liked, then unlike
    if (results.length > 0) {
      console.log("Post already liked. Sending response");
      const removequery =
        "DELETE FROM likes WHERE liked_posts_id = ? AND liked_by = ?";
      pool.query(removequery, [post_id, liked_by], (error, results) => {
        if (error) {
          console.log("Database error in remove query", error);
          return res.status(500).json({ message: "Error unliking post" });
        }
        if (results) {
          console.log("Post unliked successfully. Sending response");
          return res.status(200).json({
            message: "Post unliked successfully",
            data: results.affectedRows,
          });
        }
      });
    } else {
      console.log("Post not liked yet, proceeding with insert");
      const insertQuery =
        "INSERT INTO likes (liked_posts_id, liked_by) VALUES (?, ?)";
      pool.query(insertQuery, [post_id, liked_by], (error, results) => {
        console.log("Executing query", insertQuery, [
          post_id,
          liked_by,
          author_id,
        ]);
        if (error) {
          console.log("database error in insert query", error);
          return res.status(500).json({ message: "Error liking post" });
        }
        if (results) {
          console.log("Post liked successfully. Sending response");
          return res.status(200).json({
            message: "Post liked successfully",
            data: results.insertId,
          });
        }
      });
    }
  });
};
const getlikedpost = (req, res) => {
  const liked_by = req.userId;
  const Liked_posts_id = req.params.post_id;
  console.log("get liked line 73", liked_by, Liked_posts_id);

  const query = `SELECT * FROM likes WHERE liked_by = ? AND Liked_posts_id = ?`;
  pool.query(query,[liked_by, Liked_posts_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result) {
      return res
        .status(200)
        .json({ message: "likes retrieved successfully!", data: result });
    } else {
      res.status(400).json({ message: "No likes found!" });
    }
  });
};
module.exports = { likePost, getlikedpost };
