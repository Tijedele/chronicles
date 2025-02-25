import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = (tkn, userDetails) => {
    if (tkn && userDetails) {
      localStorage.setItem("token", tkn);
      localStorage.setItem("user", JSON.stringify(userDetails));
      setToken(tkn);
      setUser(userDetails);
    } else {
      console.log("Token & user details not provided");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };
  return (
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
