import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import OrderItem from "../../admin/order/OrderItem";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getOrder } from "../../../service/orderService";
import LoaddingScreen from "../LoadingScreen";
import { CaretLeft, CaretRight } from "phosphor-react";
import { formatNumber } from "../../../utils/formatNumber";
const OrderDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getOrder(id,token)
      .then((response) => {
        console.log("derdetail", response);
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!orderDetail) return <LoaddingScreen />;
  return (
    <Box sx={{ flex: "0 0 auto", width: "75%", padding: "10px 15px" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ padding: "5px 0px", borderBottom: "1px solid #ebebe2" }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <CaretLeft />
          <Typography>Đơn Hàng Của Bạn</Typography>
        </Stack>

        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Typography>Ngày đặt Hàng : {orderDetail?.createAt}</Typography>
          <Typography>Mã đơn hàng : {orderDetail?.code}</Typography>
        </Stack>
      </Stack>

      <Box sx={{ width: "100%", margin: "30px auto", padding: "10px 0px" }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box
            sx={{ width: "48%", padding: "5px 5px", backgroundColor: "#fff" }}
          >
            <Typography variant="caption">Thông Tin Giao Hàng</Typography>

            <Stack sx={{ marginTop: "10px", height: "100%" }} spacing={1}>
              <Stack direction={"row"}>
                <Typography sx={{ flex: "1 0 auto", textAlign: "right" }}>
                  {" "}
                  Người nhận:
                </Typography>
                <Typography sx={{ width: "65%", paddingLeft: "5px" }}>
                  {orderDetail.name}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography sx={{ flex: "1 0 auto", textAlign: "right" }}>
                  {" "}
                  Số điện thoại:
                </Typography>
                <Typography sx={{ width: "65%", paddingLeft: "5px" }}>
                  {orderDetail.phone}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography sx={{ flex: "1 0 auto", textAlign: "right" }}>
                  Ghi Chú:
                </Typography>
                <Typography sx={{ width: "65%", paddingLeft: "5px" }}>
                  {orderDetail.note}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography sx={{ flex: "1 0 auto", textAlign: "right" }}>
                  Địa chỉ:
                </Typography>
                <Typography sx={{ width: "65%", paddingLeft: "5px" }}>
                  {orderDetail.address}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{ width: "45%", padding: "5px 5px", backgroundColor: "#fff" }}
          >
            <Typography variant="caption">Thông Tin Thanh Toán</Typography>

            <Stack sx={{ marginTop: "10px", height: "100%" }} spacing={1}>
              <Stack direction={"row"}>
                <Typography sx={{ flex: "1 0 auto", textAlign: "right" }}>
                  Tổng tiền:
                </Typography>
                <Typography sx={{ width: "65%", paddingLeft: "5px" }}>
                  {formatNumber(orderDetail.amount)}Đ
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography sx={{ flex: "1 0 auto", textAlign: "right" }}>
                  Hình thức thanh toán:
                </Typography>
                <Typography sx={{ width: "65%", paddingLeft: "5px" }}>
                  {orderDetail.paymentType}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography sx={{ flex: "1 0 auto", textAlign: "right" }}>
                  Trạng thái:
                </Typography>
                <Typography sx={{ width: "65%", paddingLeft: "5px" }}>
                  {orderDetail.orderStatus}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ backgroundColor: "#fff", padding: "10px 15px" }}>
        <Typography variant="h5">Chi Tiết Đơn Hàng</Typography>

        <Grid
          container
          sx={{
            background: "rgb(255, 255, 255)",
            padding: "8px 16px",
            borderRadius: "4px",
            color: "rgb(36, 36, 36)",
            fontWeight: "400",
            fontSize: "13px",
            marginBottom: "12px",
            position: "sticky",
            top: "0px",
            marginTop: "15px",
          }}
          columnGap={2}
          alignItems={"center"}
        >
          <Grid item md={5}>
            <Typography>Sản Phẩm</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>Đơn Giá</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>Số Lượng</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>Thành Tiền</Typography>
          </Grid>
        </Grid>
        {orderDetail?.items &&
          orderDetail?.items.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
      </Box>
    </Box>
  );
};

export default OrderDetail;
