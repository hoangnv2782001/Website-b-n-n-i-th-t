import {
  CheckBoxOutlined,
  CheckCircleOutlineRounded,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { CaretRight, CheckCircle } from "phosphor-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CreateOrder,
  CreateOrderWithPaymentOnline,
} from "../../redux/slices/order";

const CompleteCheckout = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "1280px",
        paddingLeft: "24px",
        paddingRight: "24px",
        marginRight: "13px",
        marginLeft: "13px",
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ marginTop: "20px" }}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/home");
          }}
        >
          {"Trang chủ"}
        </Typography>
        <CaretRight />
        <Typography>Đặt Hàng Thành Công</Typography>
      </Stack>

      <Box
        sx={{
          width: "700px",
          margin: "25px auto",
        }}
      >
        <Stack spacing={2} alignItems={"center"}>
          {" "}
          <CheckCircleOutlineRounded
            sx={{ color: "#f22", width: "100px", height: "100px" }}
          />
          <Typography variant="h5">Đặt Hàng Thành Công</Typography>
        </Stack>

        <Box
          sx={{
            backgroundColor: "#fff",
            width: "100%",
            marginTop: "15px",
            padding: "15px 16px",
          }}
        >
          <Stack alignItems={"center"}>
            <Typography sx={{ textAlign: "center" }} variant="body1">
              Bạn đã đặt thành công sản phẩm của NoiThatOnline. Chúng tôi sẽ
              liên hệ quý khách trong thời gian sớm nhất để bàn giao sản phẩm
            </Typography>
            <Stack
              sx={{
                backgroundColor: "#fff",
                width: "30%",
                marginTop: "15px",

                marginX: "auto",
              }}
              alignItems={"'center"}
            >
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Tiếp tục mua hàng
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CompleteCheckout;
