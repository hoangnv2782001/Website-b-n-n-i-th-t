import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { CaretDown, CaretRight } from "phosphor-react";
import LoadingScreen from '../../../components/ui/LoadingScreen'

import { Outlet, useNavigate } from "react-router-dom";
import Chart from "../../../components/admin/statistic/StatisticChart";
import { useState } from "react";
import { useEffect } from "react";
import { getStatisticRevenue } from "../../../service/statisticService";
import { useSelector } from "react-redux";

const Statistic = () => {
  const navigate = useNavigate();

  const [revenue,setRevenue] = useState(null);

  const {token} = useSelector(state=>state.auth)

  useEffect(()=>{
       getStatisticRevenue(token)
       .then((response)=>{
        console.log("revenue",response)
        setRevenue(response.data)
       }).catch((error)=>{
        console.log("revenue error",error)
        setRevenue([])
       })
  },[])

  if(revenue === null){
    return <LoadingScreen/>
  }
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
        <Typography>{"Thống Kê"}</Typography>

       
      </Stack>

      <Chart revenue={revenue} />

      {/* <Products/> */}

      {/* <NewProduct/> */}
      <Outlet />
    </>
  );
};

export default Statistic;
