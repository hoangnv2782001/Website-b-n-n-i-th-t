import { Grade } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ConfirmOrder, GetOrder } from "../../../redux/slices/order";
import { getOrder } from "../../../service/orderService";
import LoadingScreen from "../../ui/LoadingScreen";
import { formatNumber } from "../../../utils/formatNumber";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    getOrder(id, token)
      .then((response) => {
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleConfirmOrder = () => {
    dispatch(ConfirmOrder(id, navigate));
  };
  if (orderDetail === null) return <LoadingScreen />;

  return (
    <Stack spacing={4} sx={{ marginTop: 5 }}>
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
                  Ghi Chú
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
          columnGap={3}
          alignItems={"center"}
        >
          <Grid item lg={5}>
            <Typography>Sản Phẩm</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Đơn Giá</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Số Lượng</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Thành Tiền</Typography>
          </Grid>
        </Grid>
        {orderDetail?.items &&
          orderDetail?.items.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
      </Box>
      {orderDetail?.orderStatus === "SUBMITTED" && (
        <Button
          variant="contained"
          sx={{ marginTop: "20px", maxWidth: "120px" }}
          onClick={handleConfirmOrder}
        >
          Xác Nhận
        </Button>
      )}
    </Stack>
  );
};

export default OrderDetail;
