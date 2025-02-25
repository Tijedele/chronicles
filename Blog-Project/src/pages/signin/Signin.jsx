import axios from 'axios'
import React, { useEffect, useState } from "react";
import "./Signin.css";
import { Link, Links, Route, Routes, useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";

const Signin = () => {
  const { login, token} = useUser();
  // console.log(login, token)
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/Home');
    }
  }, [token]);


  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev)=>({...prev, [name]: value}))
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    try{
      const res = await axios.post(
        'http://localhost:5000/users/signin',
        loginDetails
      );
      console.log(res);
      login(res.data.token, res.data.data);
      navigate('/home')
    } catch (e) {
      console.log(e);
    }

  }
  const handlesubmit = (e) => {
    
  }
  
  return (
    <div className="signin">
      {/* <div className="overlay"></div> */}
      <div className="content">
        <form onSubmit={handleLogin}>
          <div className="header">
            <h2>Welcome back</h2>
            <p>To</p>
            <h1>Chronicles</h1>
          </div>
          <div className="inputs">
            {/* <input type="text" className="inputs-tags" placeholder="username" /> */}
            <input
              type="text"
              // pattern="^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.\]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]+)$" 
              className="inputs-tags"
              placeholder="Enter email or username"
              onChange={handleChange}
              name='email'
              // value={loginDetails.username}
            />
            <input
              type="password"
              className="inputs-tags"
              placeholder="password"
              onChange={handleChange}
              name='password'
              // value={loginDetails.password}
            />
            <button type="submit" className="btn" >
              Sign in
            </button>
          </div>
          <div className="remember">
            <input className="checkbox" type="checkbox" id="Remember-me" />
            <label htmlFor="remember me">Remember me</label>
          </div>
          <div className="access">
            <div className="line"></div>
            <span>Sign in Options</span>
            <div className="line"></div>
          </div>
          <div className="socials">
            <button type='button' className="social-btn">Google</button>
            <button className="social-btn">Facebook</button>
            <button className="social-btn">Email</button>
          </div>
        </form>
        <div className="No_account">
          <span>Do not have an account?</span>
          <Link to='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
