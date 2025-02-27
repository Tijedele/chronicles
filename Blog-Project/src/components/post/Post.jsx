import React, { useEffect, useRef, useState } from "react";
import "./post.css";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import axios from "axios";
const Post = () => {
  const { token: tkn, user: userDetails } = useUser();
  console.log(tkn);
  console.log(userDetails);
  const navigate = useNavigate();
  useEffect(() => {
    if (!tkn) {
      navigate("/");
    }
  }, [tkn, navigate]);

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const imageRef = useRef(null);

  const handleImageUpload = () => {
    console.log("Do want to upload");
    console.log(imageRef);
    if (imageRef && imageRef.current) {
      imageRef.current.click();
    }
  };

  const imageUpload = () => {
    const file = e.target.files[0];
    file && setImage(file);
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl);
    setImageUrl(imgUrl);
  };

  const apiUrl = import.meta.env.VITE_APIURL;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`);
      console.log(res);
      setPosts(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (post_id) => {
    axios
      .delete(`${apiUrl}/posts/${post_id}`, {
        headers: { Authorization: `Bearer ${tkn}` },
      })
      .then((res) => {
        console.log(res);
        getAllPosts();
        alert("Post Deleted Successfully");
      })
      .catch((e) => {
        console.log(e);
        alert("Failed to Delete Post");
      });
  };

  const token = localStorage.getItem("token");

  const headers = {
    authorization: "Bearer " + token,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/post/createpost`,
        {
          title: e.target.title.value,
          content: e.target.content.value,
        },
        { headers }
      );
      console.log(res);
      const post_id = res.data.data.post_id;
      console.log(post_id);

      // Upload Image to the server
      const formData = new FormData();
      formData.append("image", image);
      formData.append("post_id", post_id);
      try {
        const res = await axios.post(`${apiUrl}/uploads/image`, formData);
        console.log(res);
        alert("Post Created Successfully");
      } catch (e) {
        console.log(e);
        alert("Error Uploading Image");
        return;
      }

      e.target.reset();
      getAllPosts();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(posts.length)
  return (
    <div  className="" style={{display:'flex', flexWrap:'wrap', gap:'24px', marginInline: '100px', border: ''}}>
      {posts?.map((post, index) => (
        <div onClick={() => navigate(`/single/${post?.post_id}`)} key={index} className="post">
          <img
            src={`${apiUrl}/${post?.image_url}`}
            alt=""
          />
          <div className="postInfo">
            <div className="postCats">
              <span className="postCat">Food & Lifstyle</span>
              <span className="postCat">Health Matters</span>
            </div>
            <span className="postTitle">{post?.post_title}</span>
            <hr />
            <span className="postDate">{post?.created_at}</span>
          </div>
          <p className="postDesc">{post?.post_content.slice(0, 15)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
