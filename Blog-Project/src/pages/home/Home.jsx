import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Posts from "../posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <Posts />
        <SideBar />
      </div>
    </>
  );
};

export default Home;
