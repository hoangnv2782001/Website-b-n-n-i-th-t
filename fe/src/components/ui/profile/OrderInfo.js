import { AppBar, Box, Pagination, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderTable from "./OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LoadingScreen from "../../ui/LoadingScreen";
import { getOrders } from "../../../service/orderService";
import { useSearchParams } from "react-router-dom";

const OrderInfo = () => {
  const [orders, setOrders] = useState(null);

  const [isLoading, setIsloading] = useState(true);

  const [value, setValue] = React.useState(0);

  const [page,setPage] = useState(1)

  const [totalPage,setTotalPage] = useState(1)

  const { id } = useSelector((state) => state.user);

  const { token } = useSelector((state) => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setParam("status",newValue === 1 ? "SUBMITTED" : "COMPLETED")
    setPage(1)
  };

  const handleOnChangePage = (e,value) =>{
    setPage(value)
    // setParam()
  }

  const [param,setParam] = useSearchParams();

  useEffect(() => {
    getOrders(
      value === 0 ? "all" : value === 1 ? "SUBMITTED" : "COMPLETED",
      id,
      token,
      page
    )
      .then((response) => {
        console.log("user order", response);

        console.log("value u ôrder :", value);
        setOrders(response.data.data);
        setIsloading(false);
        setTotalPage(response.data.totalPages)
      })
      .catch((error) => {
        console.log("user order", error);
        setOrders([]);
        setIsloading(false);
      });
  }, [value,page]);

  if (!orders) return <Box></Box>;

  return (
    <Box sx={{ flex: "0 0 auto", width: "75%", padding: "10px 15px" }}>
      <Typography
        sx={{
          fontSize: "19px",
          lineHeight: "21px",
          fontWeight: "300",
          margin: "20px 0px 15px",
        }}
      >
        Đơn Hàng Của Bạn
      </Typography>
      <Box
        sx={{
          padding: "10px 15px",
          backgroundColor: "#fff",
          marginBottom: "20px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="full width tabs example"
        >
          <Tab label="Tất Cả Đơn" {...a11yProps(0)} />
          <Tab label="Chờ Xử Lí" {...a11yProps(1)} />
          <Tab label="Hoàn Thành" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Box sx={{ backgroundColor: "#fff", minHeight: "740px" }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Box sx={{ width: "100%", margin: "30px auto", padding: "10px 0px" }}>
            <TabPanel value={value} index={0} dir={"ltr"}>
              <OrderTable orders={orders} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={"ltr"}>
              <OrderTable orders={orders} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={"ltr"}>
              <OrderTable orders={orders} />
            </TabPanel>
          </Box>
        )}
      </Box>
      <Stack
        sx={{ mt: "10px" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {" "}
        <Pagination count={totalPage} page={page} onChange={handleOnChangePage} />
      </Stack>
    </Box>
  );
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default OrderInfo;
