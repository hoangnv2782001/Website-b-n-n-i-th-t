import { Box, Stack, Typography } from "@mui/material";
import { CaretRight } from "phosphor-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Index = () => {
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
        <Typography>Đơn Hàng</Typography>
      </Stack>



      {/* <Categorys/> */}

      {/* <NewCategory/> */}
      <Outlet />
    </>
  );
};

export default Index;
