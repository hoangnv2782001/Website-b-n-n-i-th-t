import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtetedAuthRouter = ({ children }) => {
  // const { isLoggedIn, token } = useSelector((state) => state.auth);

  

  // if (isLoggedIn && token) return <Navigate to={"/home"} replace />;

  return children;
};

export default ProtetedAuthRouter;
