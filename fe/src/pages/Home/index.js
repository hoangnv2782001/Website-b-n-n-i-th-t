import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/shared/header";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/ui/home/Sidebar";
import HomeContent from "../../components/ui/home/HomeContent";
import { useDispatch, useSelector } from "react-redux";
import { SetAuth } from "../../redux/slices/auth";

import Footer from "../../components/shared/footer";
import { useState } from "react";
import { CreateOrderWithPaymentOnline } from "../../service/orderService";
import { SetCart } from "../../redux/slices/cart";
import LoadingScreen from "../../components/ui/LoadingScreen";

const Home = () => {

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F7F7F7",
      }}
      justifyContent={"space-between"}
    >
      <Header />

      <Stack direction={"column"} >
        <Outlet />
        <Footer />
      </Stack>
    </Stack>
  );
};

export default Home;
