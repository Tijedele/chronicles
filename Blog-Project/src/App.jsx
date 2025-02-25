import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import NewHome from "./pages/home/NewHome";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Single from "./pages/single/single";
import Write from "./pages/write/Write";
import UserSettings from "./pages/UserSettings/UserSettings";
import SinglePost from "./pages/SinglePost/SinglePost";
import Blogs from "./pages/blogs/Blogs";

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<TopBar/>}/> */}
      <Route path="/home" element={<NewHome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="/single/:post_id" element={<Single />} />
      <Route path="/createpost" element={<Write/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/usersettings" element={<UserSettings/>} />
      {/* <Route path="/postdetails/:post_id" element={<SinglePost/>} /> */}
    </Routes>
  );
}
