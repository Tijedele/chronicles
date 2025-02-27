import axios from "axios";
import React from "react";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TiptapEditor from "../../components/ui/Editor";
import Interactions from "../../components/Interactions/Interactions";
import { useUser } from "../../hooks/useUser";

const SinglePost = ({ post_id }) => {
  const [post, setPost] = useState(null);
  const apiUrl = import.meta.env.VITE_APIURL;
  console.log(post_id);
  const { user } = useUser();
  useEffect(() => {
    if (post_id) getPost();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [post_id]);

  const getPost = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts/${post_id}`);
      console.log(res);
      setPost(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="singlePost">
      <div
        style={{ display: "", backgroundColor: "" }}
        className="SinglePostWrapper"
      >
        <img
          src={`${apiUrl}/${post?.image_url}`}
          alt=""
          className="singlePostImg"
        />
        <h1 className="singlePostTitle">{post?.post_title}</h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            {" "}
            Author: <b>{post?.author}</b>
          </span>
          <span className="singlePostDate">
            {post?.created_at}
            <b></b>
          </span>
        </div>
        <div className="singlePostDesc">
          <div dangerouslySetInnerHTML={{ __html: post?.post_content }} />
        </div>
        <div
          style={{ border: "1px solid grey", margin: "10px, 10px, 10px, 10px" }}
        ></div>
        <Interactions
          post_id={post?.post_id}
          user_id={user?.user_id}
          author_id={post?.author_id}
        />
      </div>
    </div>
  );
};

export default SinglePost;
