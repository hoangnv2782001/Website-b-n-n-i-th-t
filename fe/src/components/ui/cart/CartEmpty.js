import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import emptycart from "../../../assets/cart.png";
import { useNavigate } from "react-router-dom";
const CartEmpty = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        background: "rgb(255, 255, 255)",
        borderRadius: "8px",
        width: "100%",
        padding: "16px 0px",
      }}
      spacing={3}
      alignItems={"center"}
    >
      <img
        src={emptycart}
        alt="image"
        style={{ width: "160px", height: "160px" }}
      />

      <Typography>Giỏ Hàng Của Bạn Trống</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/home");
        }}
      >
        Mua Ngay
      </Button>
    </Stack>
  );
};

export default CartEmpty;
