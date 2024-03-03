import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { SetAuth } from "../redux/slices/auth";
import LoadingScreen from "../components/ui/LoadingScreen";
import { useEffect } from "react";
import { useState } from "react";

const PrivateAdminRoute = ({ children }) => {
  const location = useLocation();

  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  },[]);

  const { role } = useSelector((state) => state.user);

  console.log("private : ", isLoggedIn, isLoading, role);

  if (isLoading || loading) return <LoadingScreen />;

  if (!isLoggedIn) {
    console.log("private1 : ", isLoggedIn, isLoading, role);
    return <Navigate to={`/auth/login?next=${location.pathname}`} replace/>;
  }

  if (isLoggedIn && role === "USER") return <Navigate to={`/404`} />;

  return children;
};

export default PrivateAdminRoute;
