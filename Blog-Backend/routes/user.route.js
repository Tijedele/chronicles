const express = require("express");
const {
  userLogin,
  userSignup,
  userUpdate,
  getUser,
} = require("../controllers/user.controller");
const protect = require("../middlewares/protect");

const userRoute = express.Router();

userRoute.post("/signin", userLogin);
userRoute.post("/signup", userSignup);
userRoute.put("/:user_id", userUpdate);
userRoute.get("/profile", protect, getUser);

module.exports = userRoute;
