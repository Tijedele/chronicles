const express = require("express");
const {followers, getFollowing, getFollower} = require("../controllers/followers.controller")
const protect = require("../middlewares/protect");

const followerRoute = express.Router();

followerRoute.post("/:user_id", protect, followers);
followerRoute.get("/get-followers", protect,getFollower);
followerRoute.get("/get-following", protect,getFollowing);


module.exports = followerRoute;
