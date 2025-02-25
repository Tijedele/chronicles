import { useState, useEffect, useRef } from "react";
import "./TopBar.css";
import flower from "../../assets/flower.png";
import { Link, useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import MyDropdown from "../dropdown/Dropdown";


const TopBar = () => {
  const [showAvatar, setShowAvatar] = useState(false)
  const navigate = useNavigate()

  const { token: tkn, user: userDetails, logout } = useUser();
  console.log(tkn);
  const token = localStorage.getItem("token");
  console.log(userDetails);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
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
        <h1 className="logo" onClick={() => navigate('../../home')} style={{cursor: 'pointer'}}>Chronicles</h1>
        {/* <i className="topIcon fa-brands fa-square-instagram"></i>
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-x-twitter"></i> */}
      </div>
      <div className="topcenter">
        <input
          type="search"
          name=""
          id=""
          placeholder="What would you like to read"
        />
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        {/* <form className="search-form">
          <input type="search" placeholder="What would you like to read" />
         
        </form> */}
        {/* <ul className='topList'>
                <li className='topListItem'>HOME</li>
                <li className='topListItem'>ABOUT</li>
                <li className='topListItem'>CONTACT</li>
                <li className='topListItem'>WRITE</li>
                <li className='topListItem'>LOGOUT</li>
            </ul> */}
      </div>
      <div className="topright">
        
        <div>
          {/* <img onClick={()=>setShowAvatar((prev)=>!prev)} className="topImg " src={flower} alt="" /> */}
          <MyDropdown/>
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
