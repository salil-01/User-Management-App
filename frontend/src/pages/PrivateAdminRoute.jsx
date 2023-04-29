import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateAdminRoute = ({ children }) => {
  const { isAdminAuth } = useContext(AuthContext);

  return !isAdminAuth ? <Navigate to={"/login"} /> : children;
};
