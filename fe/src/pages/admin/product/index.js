import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { CaretDown, CaretRight } from "phosphor-react";

import Products from "../../../components/admin/product/Products";
import NewProduct from "../../../components/admin/product/NewProduct";
import { Outlet, useNavigate } from "react-router-dom";

const ProductDashboard = () => {
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
        <Typography>{"Sản Phẩm"}</Typography>
      </Stack>

      {/* <Products/> */}

      {/* <NewProduct/> */}
      <Outlet />
    </>
  );
};

export default ProductDashboard;
