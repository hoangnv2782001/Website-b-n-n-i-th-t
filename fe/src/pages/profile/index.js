import { Box, Stack } from "@mui/material";
import React from "react";
import Sidebar from "../../components/ui/profile/Sidebar";
import ProfileInfo from "../../components/ui/profile/ProfileInfo";
import { Outlet } from "react-router-dom";
const Profile = () => {

  
  return (
    <Box
      sx={{
        width: "1280px",
        paddingLeft: "24px",
        paddingRight: "24px",
        marginRight: "13px",
        marginLeft: "13px",
      }}
    >
      <Stack
        direction={"row"}
        sx={{ paddingTop: "16px" }}
        justifyContent={"space-between"}
      >
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};

export default Profile;
