const pool = require("../Database_config/db");

const followers = (req, res) => {
  const followeeId = req.params.user_id;
  const follower_id = req.userId;
  console.log(followeeId);
  // Check if user is not following self
  if (follower_id === req.user_id) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }
  // Check if the follower has already followed the logged in user
  const query = "SELECT * FROM followers WHERE followed_by =? AND user_id=?";
  pool.query(query, [follower_id, followeeId], (error, results) => {
    if (error) {
      console.log("line 14", error);
      return res
        .status(500)
        .json({ message: error?.message ?? "Error checking follower status" });
    }
    if (results.length > 0) {
      // unfollow
      const unfollowQuery = `DELETE FROM followers where user_id = ? and followed_by = ?`;
      pool.query(unfollowQuery, [followeeId, follower_id], (err, result) => {
        if (err) {
          console.log("line 24", err);
          return res.status(500).json({ message: err.message });
        } else {
          if (result) {
            console.log("user_id = ", followeeId);
            const unfollowFolloweeQuery = `DELETE FROM following where user_id = ? and follow_id = ?`;
            pool.query(
              unfollowFolloweeQuery,
              [follower_id, followeeId],
              (err, result) => {
                if (err)
                  return res
                    .status(500)
                    .json({ message: err.message ?? "An error occured" });
                console.log(result);
                if (result) {
                  return res
                    .status(200)
                    .json({ message: "User unfollowed successfully" });
                }
              }
            );
          }
        }
      });
    } else {
      // Follow the user
      const insertQuery =
        "INSERT INTO followers (followed_by, user_id) VALUES (?, ?)";
      pool.query(insertQuery, [follower_id, followeeId], (error, result) => {
        if (error) {
          console.log("line 40", error);
          return res
            .status(500)
            .json({ message: error?.message ?? "Error following user" });
        } else if (result) {
          const updateFollowQuery = `INSERT INTO following (user_id, follow_id) VALUES(?, ?)`;
          pool.query(
            updateFollowQuery,
            [follower_id, followeeId],
            (error, result) => {
              if (error) {
                return res.status(500).json({ message: error.message });
              }
              if (result) {
                return res
                  .status(200)
                  .json({ message: "User followed successfully" });
              }
            }
          );
          // return res
          //   .status(200)
          //   .json({ message: "User followed successfully" });
        }
      });
    }
  });
};

const getFollowers = (req, res) => {
  const followeeId = req.user;
  const { follower } = req.params;
  const query = "SELECT * FROM following WHERE follow_id =? and user_id=?";
  pool.query(query, [followeeId, follower], (error, results) => {
    if (error) {
      console.log("line 64", error);
      return res
        .status(500)
        .json({ message: error?.message ?? "Error fetching followers" });
    }
    console.log(results);
    if (results.length > 0) {
      return res
        .status(200)
        .json({ message: "Followers fetched successfully", data: results });
    } else {
      return res.status(400).json({ message: "No followers found" });
    }
  });
};

// Who user is following
const getFollowing = (req, res) => {
  const user_id = req.userId;
  console.log(user_id);

  const followingQuery = `SELECT * from following where user_id = ?`;
  pool.query(followingQuery, [user_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    console.log(result);
    if (result) {
      res
        .status(200)
        .json({ message: "following retrieved successfully!", data: result });
    } else {
      res.status(400).json({ message: "No followings found!" });
    }
  });
};

const getFollower = (req, res) => {
  const user_id = req.userId;
  const query = "select * from followers where user_id = ?";
  pool.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    console.log(result);
    if (result) {
      res
        .status(200)
        .json({ message: "followers retrieved successfully!", data: result });
    } else {
      res.status(400).json({ message: "No followings found!" });
    }
  });
};
module.exports = { followers, getFollower, getFollowing };
