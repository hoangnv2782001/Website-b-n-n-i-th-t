import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import LoginForm from "../../components/ui/Form/LoginForm";

/**
 * Comnent login app
 * @returns {Component}
 */
const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Đăng Nhập</Typography>
       

        {/* Lgin Form */}
        <LoginForm/>

        {/* auth social  */}
        {/* <AuthSocial /> */}
      </Stack>
    </>
  );
};

export default Login;
