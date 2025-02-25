import React from "react";
import TopBar from "../../components/topbar/TopBar";
import Posts from "../posts/Posts";
import Carousel from "../../components/carousel/Carousel";
import Post from "../../components/post/Post";

const Blogs = () => {
  return (
    <>
      <div>
        <TopBar/>
        <Carousel/>
        <div  style={{marginInline: '20px'}}>
        <Post/>
        <Post/>
        </div>

      </div>
    </>
  );
};

export default Blogs;
