import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { CaretDown, CaretRight } from "phosphor-react";

import Categorys from "../../../components/admin/category/Categorys";
import NewCategory from "../../../components/admin/category/NewCategory";
import { Outlet, useNavigate } from "react-router-dom";

const CategoryDashboard = () => {
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
        <Typography>Danh Mục</Typography>
      </Stack>

      {/* <Categorys/> */}

      {/* <NewCategory/> */}
      <Outlet />
    </>
  );
};

export default CategoryDashboard;
