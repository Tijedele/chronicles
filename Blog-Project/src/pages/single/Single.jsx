import React from "react";
import "./single.css";
import SideBar from "../../components/sidebar/SideBar.jsx";
import TopBar from "../../components/topbar/TopBar.jsx";
import SinglePost from "../SinglePost/SinglePost.jsx";
import Comments from "../../components/comments/Comments.jsx";
import { useParams } from "react-router";
import Interactions from "../../components/Interactions/Interactions.jsx";

const Single = () => {
    const { post_id } = useParams();
  
  return (
    <>
      <TopBar />
      <div className="single">
        <div>
        <SinglePost post_id={post_id} />
        
        <Comments/>
        </div>
        <SideBar />
      </div>
    </>
  );
};

export default Single;
