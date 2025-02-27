import React, { useEffect, useState } from "react";
import { FaComment, FaBookmark, FaHeart } from "react-icons/fa";
import "./profile.css";
import axios from "axios";
import { useUser } from "../../hooks/useUser";
import TopBar from "../../components/topbar/TopBar";
import { useNavigate } from "react-router";
// import profilePic from "../assets/profile-pic.png"; // Replace with actual image path
// import postImage from "../assets/twitter.png"; // The uploaded image reference

const UserProfile = () => {
  const { token, user: userDetails } = useUser();
  const apiUrl = import.meta.env.VITE_APIURL;
  const headers = { authorization: "Bearer " + token };
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [user, setUser] = useState({
    user_id: "",
    username: "",
    email: "",
    full_name: "",
  });
  const [posts, setPosts] = useState([]);
  const [deleteposts, setdeletePosts] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${apiUrl}/users/profile`, { headers });
      console.log(res);
      setUser(res.data.user);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getFollowings();
  }, [token]);
  useEffect(() => {
    getUser();

    getFollowers();
    getAllPosts();
  }, [token]);
  const navigate = useNavigate();
  const getFollowings = async () => {
    console.log("following....");
    try {
      const res = await axios.get(`${apiUrl}/follow/get-following`, {
        headers,
      });
      console.log(res);
      const followings = res.data.data;
      console.log(followings);
      setFollowings(followings);
      // return res.data.data;
    } catch (error) {
      console.log("Error getting followers:", error);
    }
  };

  const getFollowers = async () => {
    console.log("followers....");
    try {
      const res = await axios.get(`${apiUrl}/follow/get-followers`, {
        headers,
      });
      console.log(res);
      const followers = res.data.data;
      console.log(followers);
      setFollowers(followers);
      // return res.data.data;
    } catch (error) {
      console.log("Error getting followers:", error);
    }
  };
  const getAllPosts = async () => {
    console.log("user id", user);
    try {
      const res = await axios.get(`${apiUrl}/posts`);
      const posts = res.data.data.filter(
        (post) => post.author_id == userDetails.user_id
      );
      console.log("posts...", res);
      console.log(posts);
      setPosts(posts);
    } catch (e) {
      console.log(e);
    }
  };
  const putPosts = async () => {};
  const handleDelete = async (post_id) => {
    try {
      const res = await axios.delete(`${apiUrl}/posts/${post_id}`, { headers });
      console.log(res);

      getAllPosts();
    } catch (e) {
      console.log(e);
    }
  };

  const profile = {
    username: "tijesunimi",
    handle: "@Tjieabiola",
    bio: "",
    joined: "January 2020",
    birthdate: "December 1, 2003",
    following: 8,
    followers: 2,
    posts: [
      {
        id: 1,
        author: "Burna Boy",
        handle: "@burnaboy",
        date: "Jan 24, 2020",
        content: "Can you keep a secret?......... 🤔",
        likes: "5.5K",
        retweets: "2.5K",
        comments: "37K",
      },
    ],
  };

  return (
    <>
      {/* <TopBar/> */}
      <div>
        <div className="profile-container">
          <div className="header"></div>
          <div className="profile-info">
            <img src={""} alt="Profile" className="profile-pic" />
            <h2>{user?.username}</h2>
            <p>{user?.full_name}</p>
            <p>{user?.email}</p>
            <p>
              <strong>{followings?.length}</strong> Following •{" "}
              <strong>{followers?.length}</strong> Followers
            </p>
          </div>
          <div className="tabs">
            <button className="active-tab">Posts</button>{" "}
            <span>{posts.length}</span>
          </div>
          <div
            className="posts"
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {posts?.map((post) => (
              <div
                key={post?.post_id}
                className="post"
                style={{ width: "90%", paddingInline: "24px" }}
              >
                <p>
                  <strong>{post.author}</strong> {post.handle} {post.date}
                </p>
                <h6>{post.post_title}</h6>
                <img
                  src={`${apiUrl}/${post?.image_url}`}
                  alt="Post"
                  className="post-img"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.post_content.slice(0, 500),
                  }}
                />
                <div className="post-actions">
                  <span>
                    <FaComment /> {post.comments}
                  </span>
                  <span>
                    <FaBookmark /> {post.retweets}
                  </span>
                  <span>
                    <FaHeart /> {post.likes}
                  </span>
                </div>
                <div className="crude">
                  <button onClick={() => navigate(`/editpost/${post.post_id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post.post_id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
