import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import React from "react";

import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Minus, Plus } from "phosphor-react";
import { useDispatch } from "react-redux";
import { Delete, DiscFull, Remove } from "@mui/icons-material";
import { DeleteCart, UpdateCart } from "../../../redux/slices/cart";

import { Faker } from "@faker-js/faker";
import { formatNumber } from "../../../utils/formatNumber";

export default function OrderItem({ item }) {
  const dispatch = useDispatch();

  console.log("item   ", item);

  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
      <Grid
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
        container
        columnGap={2}
        alignItems={"center"}
      >
        <Grid item container direction={"row"} columnGap={2} xs={5}>
          <img
            style={{ width: "80px", height: "80px" }}
            src={item.productImg}
            alt="sdfghjk"
          />
          <Typography>{item.productName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>{formatNumber(item.productPrice)}Đ</Typography>
        </Grid>
        <Grid item xs={2}>
          {item.quantity}
        </Grid>
        <Grid item xs={2}>
          <Typography>{formatNumber(item.amount)}Đ</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
