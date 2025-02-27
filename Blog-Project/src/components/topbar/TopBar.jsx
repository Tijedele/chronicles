import { useState, useEffect, useRef } from "react";
import "./TopBar.css";
import flower from "../../assets/flower.png";
import { Link, useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import MyDropdown from "../dropdown/Dropdown";
import axios from "axios";

const TopBar = () => {
  const [showAvatar, setShowAvatar] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [search_text, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();

  const { token: tkn, user: userDetails, logout } = useUser();
  const apiUrl = import.meta.env.VITE_APIURL;

  console.log(tkn);
  const token = localStorage.getItem("token");
  // console.log(userDetails);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const searchPost = async (text) => {
    try {
      const res = await axios.get(`${apiUrl}/posts/search/${text}`);
      console.log(res.data.data);
      setSearchResults(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    searchPost(search_text);
  };

  const resultRef = useRef(null);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="top">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="topleft">
        <h1
          className="logo"
          onClick={() => navigate("../../home")}
          style={{ cursor: "pointer" }}
        >
          Chronicles
        </h1>
        {/* <i className="topIcon fa-brands fa-square-instagram"></i>
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-x-twitter"></i> */}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <form
          onSubmit={handleSearch}
          onClick={() => navigate(`/single/${post?.post_id}`)}
          className="topcenter"
          style={{ background: "none" }}
        >
          <input
            type="search"
            name=""
            id=""
            value={search_text}
            onChange={(e) => {
              setSearchText(e.target.value);
              searchPost(e.target.value);
              if (e.target.value == "") {
                setShowSearchResults(false);
              }
            }}
            placeholder="What would you like to read"
            onFocus={() => {
              setShowSearchResults(true);
            }}
            // onBlur={() =>{ setShowSearchResults(false)
            //   setSearchResults([])
            // }}
          />
          <i
            onClick={handleSearch}
            className="topSearchIcon fa-solid fa-magnifying-glass"
          ></i>
        </form>
        {/* Search Results */}
        {showSearchResults && (
          <div
            ref={resultRef}
            style={{
              position: "absolute",
              top: 64,
              minHeight: "100px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              paddingInline: "12px",
              background: "rgba(255, 255, 252, 0.459)",
              width: "100%",
              fontSize: "24px",
            }}
          >
            {searchResults &&
              searchResults.map((post) => (
                <div
                  onClick={() => navigate(`/single/${post?.post_id}`)}
                  key={post.post_id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    overflowInline: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <img src={`${apiUrl}/${post.image_url}`} width={24} />
                  <p
                    className=""
                    style={{ lineClamp: "1", overflow: "hidden" }}
                  >
                    {post.post_title}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="topright">
        <div>
          {/* <img onClick={()=>setShowAvatar((prev)=>!prev)} className="topImg " src={flower} alt="" /> */}
          <MyDropdown />
          {/* { showAvatar && <div className="">
            <button type="button" onClick={() => navigate('/UserSettings')}>Profile</button>
            <button onClick={logout} style={{color: 'red'}}>Logout</button>
          </div>} */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
