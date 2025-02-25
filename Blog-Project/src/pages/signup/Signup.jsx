import React, { useEffect, useState } from "react";
import "./signup.css";
import { Link, Links, Route, Routes, useNavigate } from "react-router";
import Signin from "../signin/Signin";
import { useUser } from "../../hooks/useUser";
import axios from "axios";

const signup = () => {
  const { login, token } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/Home");
    }
  }, [token]);


  const [ signupDetails, setSignupDetails ] = useState({
    username: '',
    fullname: '',
    email: '',
    passord: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prev) => ({...prev, [name]: value}));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(signupDetails);
  
  try {
    const res = await axios.post(
      'http://localhost:5000/users/signup',
       signupDetails
    );
    console.log(res);
  
    // Auto login after signup completes
    login(res.data.token, res.data.data);
    navigate("/Home");
  } catch (e) {
    console.log(e);
  };
};
  return (
    <div className="signup">
      {/* <div className="overlay"></div> */}
      <div className="content">
        <form onSubmit={handleSignup}>
          <div className="header">
            <h2>Signup</h2>
            <p>For</p>
            <h1>Chronicles</h1>
          </div>
          <div className="inputs">
            <input type="text" className="inputs-tags" placeholder="username" onChange={handleChange} name="username"/>
            <input type="text" className="inputs-tags" placeholder="fullname" onChange={handleChange} name="fullname"/>
            <input
              type="email"
              className="inputs-tags"
              placeholder="johndoe@gmail.com"
              onChange={handleChange}
              name="email" 
            />
            <input
              type="password"
              className="inputs-tags"
              placeholder="password"
              onChange={handleChange}
              name="password"
            />
            <button type="submit" className="btn">
              Signup
            </button>
          </div>
          <div className="remember">
            <input className="checkbox" type="checkbox" id="Remember-me" />
            <label htmlFor="remember me">Remember me</label>
          </div>
          <div className="access">
            <div className="line"></div>
            <span>Signup Options</span>
            <div className="line"></div>
          </div>
          <div className="socials">
            <button type="button" className="social-btn">Google</button>
            <button type="button" className="social-btn">Facebook</button>
            <button type="button" className="social-btn">Email</button>
          </div>
        </form>
        <div className="already">
          <span>Already have an account?</span>
          <Link to="/">sign in</Link>
          {/* <link rel="stylesheet" href="" /> */}
          {/* <a href="C:\Users\ACE TECHNOLOGIES\Documents\FTI\REACT.JS\Project\Blog-Project\src\pages\signin\Signin.jsx">Sign in</a> */}
        </div>
      </div>
    </div>
  );
};

export default signup;
