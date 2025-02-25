import React from "react";
import TopBar from "../../components/topbar/TopBar";
import "./NewHome.css";
import Posts from "../posts/Posts";
import Header from "../../components/header/Header";

const NewHome = () => {
  return (
    <>
      <TopBar/>
      <div className="first-box">
        <div className="overlay"></div>
        <h1>CHRONICLES</h1>
        <p>
        A factual written account of important or historical events in the order of their occurrence.
        </p>
      </div>
      <Posts/>
      {/* <div className="second-box">
        <div className="blog-cards">

        </div>
        <div className="blog-cards"></div>
        <div className="blog-cards"></div>
        <div className="blog-cards"></div>
        <div className="blog-cards"></div>
    </div> */}
    </>
  );
};

export default NewHome;
