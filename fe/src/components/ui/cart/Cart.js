import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ShoppingCartItem from "./CartItem";
import OrderSummaryItem from "./CartSumary";

export default function ShoppingCart({ cartItems }) {
  return (
    <Box
      sx={{ flex: "1 1 0%", width: "calc(100% - 380px)", marginRight: " 20px" }}
    >
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
        }}
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
        <Grid container lg={1} justifyContent={"flex-end"}>
          <Typography>Xoá</Typography>
        </Grid>
      </Grid>

      <Box sx={{ overflow: "hiden", height: "auto" }}>
        {cartItems &&
          cartItems.map((cartItem) => (
            <ShoppingCartItem key={cartItem.id} item={cartItem} />
          ))}
      </Box>
    </Box>
  );
}
