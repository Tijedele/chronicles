import React, { useRef, useState, useEffect } from "react";
import "./UserSettings.css";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import Flower from "../../assets/flower.png";

const UserSettings = () => {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const imageRef = useRef(null);

  const handleImageUpload = () => {
    console.log(imageRef);
    if (imageRef && imageRef.current) {
      imageRef.current.click();
    }
  };

  const imageUpload = (e) => {
    const file = e.target.files[0];
    file && setImage(file);
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl);
    setImageUrl(imgUrl);
  };

  const apiUrl = import.meta.env.VITE_APIURL;

  const [updateUser, setupdateUser] = useState({
    username: "",
    fullname: "",
    email: "",
    passord: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdateUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupDetails);

    try {
      const res = await axios.put(`${apiUrl}/users/${user_id}`, updateUser);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
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
  };

  return (
    <>
      <TopBar />
      <div className="UserSettings">
        <div className="UserSettingsWrapper">
          <div className="UserSettingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
          </div>
          <form onSubmit={handleSubmit} className="UserSettingsForm">
            <label>Profile Picture</label>
            <div 
            style={{
                backgroundColor: "gray",
                height: "70px",
                width: "70px",
                color: "white",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "12px"
              }}
            onClick={handleImageUpload} className="UserSettingsPP">
              {imageUrl ? (
                <img src={imageUrl} alt="" />
              ) : (
                <i style={{width: '100px'}} className="UserSettingsPPIcon fa-regular fa-circle-user"></i>
              )}
              <input type="file" hidden ref={imageRef} onChange={imageUpload} />
              {/* <img src={imageUrl} alt="" /> */}
              {/* <label htmlFor="fileInput">
                <i className="UserSettingsPPIcon fa-regular fa-circle-user"></i
              </label> */}
              <input type="file" id="fileInput" style={{ display: "none" }} />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              onChange={handleChange}
              name="username"
            />
            <label>fullname</label>
            <input
              type="text"
              placeholder="fullname"
              onChange={handleChange}
              name="fullname"
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="myemail01@gmail.com"
              onChange={handleChange}
              name="email"
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
            />
            <button type="submit">Update</button>
          </form>
        </div>
        <SideBar />
      </div>
    </>
  );
};

export default UserSettings;
