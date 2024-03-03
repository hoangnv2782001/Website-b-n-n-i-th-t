import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { CaretDown, CaretRight } from "phosphor-react";



import { Outlet, useNavigate } from "react-router-dom";

import Users from "../../../components/admin/user/Uers";

const UserDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack
        sx={{ backgroundColor: "#ffffff" }}
        direction={"row"}
        spacing={1}
        p={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/admin")}
        >
          {"Trang chủ"}
        </Typography>
        <CaretRight />
        <Typography>{"Khách Hàng"}</Typography>
      </Stack>

      {/* <Users/> */}

      {/* <NewUser/> */}
      {/* <Outlet /> */}
      <Users/>
    </>
  );
};

export default UserDashboard;
