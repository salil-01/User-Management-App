import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateUserRoute = ({ children }) => {
  const { isUserAuth } = useContext(AuthContext);
  // console.log(isUserAuth);
  return !isUserAuth ? <Navigate to={"/login"} /> : children;
};
