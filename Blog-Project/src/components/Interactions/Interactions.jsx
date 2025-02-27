import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaUserPlus,
  FaUserCheck,
} from "react-icons/fa";
import "./Interactions.css";
import { useFetcher } from "react-router";

const Interactions = ({ post_id, user_id, author_id }) => {
  console.log(user_id);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const apiUrl = import.meta.env.VITE_APIURL;
  const token = localStorage.getItem("token");
  const [hasFollowed, setHasFollowed] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const headers = {
    authorization: "Bearer " + token,
  };
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }, // Attach token to request
  //   };

  useEffect(() => {
    getFollowers();
  }, [user_id, author_id]);
  useEffect(() => {
    getLikes();
  }, [post_id, user_id]);
  const getLikes = async () => {
    try {
      const res = await axios.get(`${apiUrl}/likes/getlikes/${post_id}`, {
        headers,
      });
      console.log(res);
      const postLikes = res.data.data;
      const likes = postLikes?.find((like) => like.liked_by == user_id);
      console.log(likes);
      if (likes) {
        setHasLiked(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async () => {
    try {
      //   if (liked) {
      const res = await axios.post(
        `${apiUrl}/likes/${post_id}`,
        { author_id, liked_by: user_id },
        { headers }
      );

      console.log(res);
      if (res.data.message == "Post liked successfully") {
        setLiked(true);
      } else {
        setLiked(false);
      }
      //   }
    } catch (error) {
      console.log("Error handling like:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await axios.put(
        `${apiUrl}/bookmarks/${post_id}`,
        { bookmarked_by: user_id },
        {
          headers,
        }
      );
      console.log(res);
      if (res.data.message == "Post Bookmarked successfully") {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
    }
  };

  const handleFollow = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/follow/${author_id}`,
        {},
        {
          headers,
        }
      );
      console.log(res);
      if (res.data.message === "User followed successfully") {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    } catch (error) {
      console.log("Error handling follow:", error);
    }
  };

  const getFollowers = async () => {
    console.log("following....");
    try {
      const res = await axios.get(`${apiUrl}/follow/get-following`, {
        headers,
      });
      console.log(res);
      const followings = res.data.data;
      console.log(followings);
      const followed = followings?.find(
        (follow) => follow.follow_id == author_id
      );
      console.log(followed);
      if (followed) {
        setHasFollowed(true);
      }
      // return res.data.data;
    } catch (error) {
      console.log("Error getting followers:", error);
    }
  };
  return (
    <div className="interactions">
      <button
        className={`like-btn ${liked || hasLiked ? "active" : ""}`}
        onClick={handleLike}
      >
        {liked || hasLiked ? <FaHeart color="white" /> : <FaRegHeart />} Like
      </button>

      <button
        className={`bookmark-btn ${bookmarked ? "active" : ""}`}
        onClick={handleBookmark}
      >
        {bookmarked ? <FaBookmark color="white" /> : <FaRegBookmark />} Bookmark
      </button>

      <button
        className={`follow-btn ${following || hasFollowed ? "active" : ""}`}
        onClick={handleFollow}
      >
        {following || hasFollowed ? (
          <FaUserCheck color="white" />
        ) : (
          <FaUserPlus />
        )}{" "}
        {following || hasFollowed ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default Interactions;
