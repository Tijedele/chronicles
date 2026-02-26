const pool = require("../Database_config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../helpers/index");

const userLogin = (req, res) => {
  const { username, email, password } = req.body;
  console.log({ username, email, password });
  if ((!username || !email) && !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username or email and password" });
  }
  // check if the user exists in the database
  const query = "SELECT * FROM user WHERE username = ? OR email = ?";
  pool.query(query, [email, email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message ?? "An error occurred while trying to sign in",
      });
    }
    // user exists
    if (results.length > 0) {
      // confirm user password
      const user = results[0];
      const { password: hashedPassword, ...userDetails } = user;
      const verifyPassword = await bcrypt.compare(password, hashedPassword);
      // Password is valid
      if (verifyPassword) {
        return res.status(200).json({
          message: "User logged in successfully",
          data: userDetails,
          token: generateToken(user.user_id),
        });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid username and password" });
      }
    }
    // user does not exist
    else {
      return res.status(400).json({ message: "User does not exist" });
    }
  });
};

// User Signup
const userSignup = (req, res) => {
  const { username, password, email, fullname } = req.body;

  if (!username || !password || !email || !fullname) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // check if user already exists
  const query = "SELECT * FROM user WHERE username =?";
  pool.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message ?? "An error occurred while trying to signup",
      });
    }
    console.log(err);
    if (results.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      // create new user
      // encryt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
      const query =
        "insert into user (username, password, email, full_name) values (?, ?, ?, ?)";
      pool.query(
        query,
        [username, hashedPassword, email, fullname],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              message:
                err.message ?? "An error occurred while trying to signup",
            });
          }
          console.log(results);
          if (results) {
            return res
              .status(201)
              .json({ message: "User created successfully" });
          }
        }
      );
    }
  });
};

// Update user
const userUpdate = (req, res) => {
  console.log("req.params", req.params);
  console.log("req.body", req.body);
  const userId = req.params.user_id;
  console.log("Updating user with Id", userId);
  const { username, password, email, fullname } = req.body;

  if (!username || !password || !email || !fullname) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  const query = "SELECT * FROM user WHERE username =?";
  pool.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message ?? "An error occurred while trying to update",
      });
    }
    console.log(err);
    if (results.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      // updating old user
      // encryt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);

      const query =
        "UPDATE user SET username = ?, password = ?, email = ?, full_name = ? WHERE user_id = ?";
      pool.query(
        query,
        [username, hashedPassword, email, fullname, userId],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              message:
                err.message ?? "An error occurred while trying to update user",
            });
          }
          if (results.affectedRows > 0) {
            console.log(results.affectedRows);
            return res
              .status(200)
              .json({ message: "User updated successfully" });
          } else {
            return res.status(404).json({ message: "User not found" });
          }
        }
      );
    }
  });
};

const getUser = (req, res) => {
  console.log("Fetching user with ID:", req.userId);
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query =
    "SELECT user_id, username, email, full_name FROM user WHERE user_id = ?";
  pool.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message ?? "An error occurred while fetching user details",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: results[0] });
  });
};



module.exports = { userLogin, userSignup, userUpdate, getUser };
