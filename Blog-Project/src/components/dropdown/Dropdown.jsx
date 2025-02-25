import { useState, useEffect } from "react";
import './Dropdown.css';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space, message } from 'antd';
import flower from "../../assets/flower.png";
import { useNavigate } from 'react-router-dom'; 
import { useUser } from "../../hooks/useUser";

const MyDropdown = () => {
  const navigate = useNavigate();
  const { token: tkn, user: userDetails, logout } = useUser();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleMenuClick = (e) => {
    if (e.key === "2") {
      navigate("/UserSettings");
    }
    if (e.key === "3") {
      navigate("/createpost");
    }
    if (e.key === "4") {
      navigate("/blogs");
    }
    if (e.key === "5") {
      logout(); 
      navigate("/");
    }
  };

  const items = [
    {
      key: '1',
      label: 'My Account',
      disabled: false,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
    },
    {
      key: '3',
      label: 'Write',
    },
    {
      key: '4',
      label: 'Blogs',
    },
    {
      key: '5',
      label: 'Logout',
    },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <img className="topImg" src={flower} style={{cursor: 'pointer'}} alt="User Avatar" />
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default MyDropdown;
