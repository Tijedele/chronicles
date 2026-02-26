const pool = require("../Database_config/db");

const getAllPosts = (req, res) => {
  const query = `SELECT p.post_id, p.post_title, p.author_id, u.full_name as author, p_i.image_url, p.post_content FROM posts p 
                     left Join user u ON u.user_id =p.author_id left JOIN post_images p_i ON p.post_id = p_i.post_id
    `;
  pool.query(query, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: err?.message ?? "Error retrieving posts" });
    if (results.length > 0) {
      console.log(results);
      return res
        .status(200)
        .json({ message: "Post retrieved successfully", data: results });
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  });
};

// Create a new post
const createPost = (req, res) => {
  const author = req.userId;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const query =
    "INSERT INTO posts (post_title, post_content, author_id) VALUES (?, ?, ?)";

  pool.query(query, [title, content, author], (err, result) => {
    if (err) {
      return res.status(500).json(err.message ?? "Error creating post");
    }
    console.log("line 33:", result);
    if (result) {
      return res.status(201).json({
        message: "Post created successfully",
        data: { title, content, author, post_id: result.insertId },
      });
    } else {
      res.status(400).json({ message: "An error occurred" });
    }
  });
};

// Get a Single Post
const getAPost = (req, res) => {
  // const postId = req.params.postId
  const { post_id } = req.params;

  const query = `SELECT p.post_id, p.post_title, p.author_id, u.full_name as author, p_i.image_url, p.post_content FROM posts p 
                     left Join user u ON u.user_id =p.author_id left JOIN post_images p_i ON p.post_id = p_i.post_id where p.post_id=?`;

  pool.query(query, [post_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Error retrieving posts" });
    if (results.length > 0) {
      return res
        .status(200)
        .json({ message: "Post gotten succesfully", data: results[0] });
    } else {
      return res.status(400).json({ message: "Post not found" });
    }
  });
};

// Delete a Post
const deletePost = (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const { post_id } = req.params;
  console.log(post_id);

  // check if post exists and if the author is the logged in user
  const query = "SELECT * FROM posts WHERE post_id = ? and author_id = ?";
  pool.query(query, [post_id, userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: err.message ?? "Error retrieving post" });
    }
    console.log("line 83", err);
    console.log(results);
    if (results.length > 0) {
      const deleteImageQuery = `DELETE FROM post_images where post_id=?`;
      pool.query(deleteImageQuery, [post_id], (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: error.message ?? "Error deleting post images" });
        }
        if (result) {
          console.log({ message: "Post images deleted successfully" });

          const deleteQuery = "DELETE FROM posts WHERE post_id = ?";

          console.log("line 86", results);
          pool.query(deleteQuery, [post_id, userId], (error, result) => {
            if (error) {
              return res
                .status(500)
                .json({ message: error.message ?? "Error deleting post" });
            }
            console.log("line 92", error);

            if (result) {
              return res.json({ message: "Post deleted successfully" });
            }
            console.log("line 97", result);
          });
        }
      });
    } else {
      return res.status(400).json("Post not found or you are not the author");
    }
  });
};
// Update post
const updatePost = (req, res) => {
    // const author = req.userId;
  const { title, content } = req.body;
  const { post_id } = req.params;
  if (!title || !content) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const updatequery =
    "UPDATE posts SET post_title = ?, post_content = ? where post_id = ?";

  pool.query(updatequery, [title, content, post_id], (err, result) => {
    if (err) {
      return res.status(500).json(err.message ?? "Error updating post");
    }
    console.log("line 33:", result);
    if (result) {
      return res.status(201).json({
        message: "Post updated successfully",
        data: { title, content, post_id, post_id: result.insertId },
      });
    } else {
      res.status(400).json({ message: "An error occurred" });
    }
  });
}
// Search post
const searchPost = (req, res) => {
  // const postId = req.params.postId
  const { search_text } = req.params;
  const searchQuery = `%${search_text}%`;

  const query = `SELECT p.post_id, p.post_title, p.author_id, u.full_name as author, p_i.image_url, p.post_content FROM posts p 
                     left Join user u ON u.user_id =p.author_id left JOIN post_images p_i ON p.post_id = p_i.post_id where p.post_title like ?`;

  pool.query(query, [searchQuery], (err, results) => {
    console.log(err);
    if (err)
      return res
        .status(500)
        .json({ message: err?.message ?? "Error retrieving posts" });
    console.log(results);
    if (results.length > 0) {
      return res
        .status(200)
        .json({ message: "Post gotten succesfully", data: results });
    } else {
      return res.status(400).json({ message: "Post not found" });
    }
  });
};

module.exports = { getAllPosts, createPost, getAPost, deletePost, updatePost, searchPost };
