import React from "react";
import flower from "../../assets/flower.png";
import "./SideBar.css";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="sidebarItemImg" src={flower} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          tempore neque eveniet earum doloribus, repellendus? Laudantium,
          laboriosam optio.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Street Gist</li>
          <li className="sidebarListItem">Hustle Stories</li>
          <li className="sidebarListItem">Food & Lifstyle</li>
          <li className="sidebarListItem">Health Matters</li>
          <li className="sidebarListItem">Music & Dance</li>
          <li className="sidebarListItem">Pop Culture Deep dives</li>
          <li className="sidebarListItem">Sports</li>
          <li className="sidebarListItem">Entertainment</li>
          <li className="sidebarListItem"></li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
