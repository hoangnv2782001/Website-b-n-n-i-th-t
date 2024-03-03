import { Box, Stack, Typography } from "@mui/material";

import React from "react";
import LoginForm from "../Form/LoginForm";
import ProfileForm from "../Form/ProfileForm";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const user = useSelector((state) => state.user);

  console.log("user tim thay",user)
  return (
    <Box sx={{ flex: "0 0 auto", width: "75%", padding: "10px 15px" }}>
      <Typography sx={{ marginBottom: "20px" }} variant="h3">
        Thông Tin Cá Nhân
      </Typography>
      <Box sx={{ backgroundColor: "#fff" }}>
        <Box sx={{ width: "60%", margin: "30px auto", padding: "40px 0px" }}>
          <ProfileForm user={user}/>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
