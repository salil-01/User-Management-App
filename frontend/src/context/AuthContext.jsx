import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
const getData = (key) => {
  let data = JSON.parse(localStorage.getItem(key)) || false;
  return data;
};
const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const AuthContextProvider = ({ children }) => {
  const [isUserAuth, setIsUserAuth] = useState(false || getData("user"));
  const [isAdminAuth, setIsAdminAuth] = useState(false || getData("admin"));
  const [name, setName] = useState("" || getData("username"));
  // console.log("main", getData("admin"));
  const login = (role, username) => {
    // console.log(role);
    setName(username);
    if (role === "admin") {
      setIsAdminAuth(true);
      setIsUserAuth(true);
    } else {
      setIsUserAuth(true);
      setIsAdminAuth(false);
    }
  };
  const logout = () => {
    setIsAdminAuth(false);
    setIsUserAuth(false);
    setName("");
  };
  useEffect(() => {
    setData("user", isUserAuth);
    setData("admin", isAdminAuth);
    setData("username", name);
  }, [isAdminAuth, isUserAuth]);
  return (
    <AuthContext.Provider
      value={{ isUserAuth, isAdminAuth, login, logout, name }}
    >
      {children}
    </AuthContext.Provider>
  );
};
