import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { SetAuth } from "../redux/slices/auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  const dispatch = useDispatch();


  return token ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
