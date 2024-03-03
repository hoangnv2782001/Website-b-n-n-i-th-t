import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";


import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";
import { CaretRight, Plus } from "phosphor-react";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../ui/LoadingScreen";
import { ContentPaste, Delete, GroupOutlined, Inventory2Outlined, ShoppingCart, Update } from "@mui/icons-material";
import { DeleteProduct, GetAllProducts } from "../../../redux/slices/product";
import Card from "./Card";
import { getNewOrders, getStatistic } from "../../../service/statisticService";
import OrderNew from "./OrderNew";

const Dashboard = () => {
  const navigate = useNavigate();

  const [statistic, setStatistic] = useState(null);

  const [orders, setOrders] = useState(null);

  const {token} = useSelector(state=>state.auth)

  useEffect(() => {
    getStatistic(token)
      .then((response) => {
        console.log("statistic", response);

        setStatistic(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getNewOrders(token)
      .then((response) => {
        console.log("new orrderr", response);

        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <Typography>{"Trang chủ"}</Typography>
      </Stack>
      <Box sx={{ textAlign: "start", marginTop: 5 }}>
       
        {statistic && (
          <Grid container spacing={2}>
            {CARD_ICON.map((e) => (
              <Grid item lg={3}>
                <Card {...e} key={e.id} quantity={statistic[e.id]} />
              </Grid>
            ))}
          </Grid>
        )}
        <Box
          p={2}
          sx={{ marginBottom: 4, marginTop: 4 }}
        >
        <Typography sx={{marginBottom:"15px"}} variant="h5">Đơn Hàng Mới</Typography>
          {orders && <OrderNew orders={orders} />}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

const CARD_ICON = [
  {
    id: "category",
    name: "Danh Mục",
    bg: "#FBAD4C",
    icon: <Inventory2Outlined sx={{ height: "50%", width: "50%" }}/>,
  },
  {
    id: "product",
    name: "Sản Phẩm",
    bg: "#59D05D",
    icon: <ShoppingCart sx={{ height: "50%", width: "50%" }}/>,
  },
  {
    id: "user",
    name: "Khách Hàng",
    bg: "#FF646D",
    icon: <GroupOutlined sx={{ height: "50%", width: "50%" }}/>,
  },
  {
    id: "order",
    name: "Đơn Hàng",
    bg: "#1D62F0",
    icon: <ContentPaste sx={{ height: "50%", width: "50%" }}/>,
  },

];
