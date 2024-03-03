import { Box, Stack, Typography } from "@mui/material";

import React from "react";
import LoginForm from "../Form/LoginForm";
import ProfileForm from "../Form/ProfileForm";
import { useSelector } from "react-redux";

import NewPasswordForm from '../../ui/Form/NewPasswordForm'
import ChangePassForm from "../Form/ChangPassForm";

const NewPassword = () => {
  const user = useSelector((state) => state.user);

  console.log("user tim thay",user)
  return (
    <Box sx={{ flex: "0 0 auto", width: "75%", padding: "10px 15px" }}>
      <Typography sx={{ marginBottom: "20px" }} variant="h3">
        Đổi Mật Khẩu
      </Typography>
      <Box sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ width: "60%", margin: "30px auto", padding: "40px 0px" }}>
          <ChangePassForm/>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPassword;
