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

import Img from "../../../assets/quan10.jpg";
import { formatNumber } from "../../../utils/formatNumber";
import { CloseDeleteDialog, ShowDeleteDialog } from "../../../redux/slices/app";

export default function ShoppingCartItem({ item }) {
  const dispatch = useDispatch();

  console.log("item   ", item);
  const increment = () => {
    dispatch(UpdateCart({ id: item.id, type: 1 }));
  };

  const decrement = () => {
    if (item.quantity > 1) dispatch(UpdateCart({ id: item.id, type: -1 }));
  };

  const handleDelete = () => {
    dispatch(DeleteCart(item));
    dispatch(CloseDeleteDialog());
  };

  const openDeleteDialog = () => {

    console.log("open dialog")
    dispatch(
      ShowDeleteDialog({
        title: "Xoá Sản Phẩm",
        message: "Bạn Có Muón Xoá Sản Phẩm Đang Chọn",
        handleSubmit : handleDelete,
        handleCancel : closeDelete
      })
    );
  };

  const closeDelete = () => {
    dispatch(CloseDeleteDialog());
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
      <Grid
        container
        sx={{
          background: "rgb(255, 255, 255)",
          padding: "8px 16px",
          color: "rgb(36, 36, 36)",
          marginBottom: "12px",
        }}
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
          <ButtonGroup>
            <Button aria-label="reduce" onClick={decrement}>
              <Remove fontSize="small" />
            </Button>
            <Button>{item.quantity}</Button>
            <Button aria-label="increase" onClick={increment}>
              <Plus fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <Typography>{formatNumber(item.amount)}Đ</Typography>
        </Grid>
        <Grid item container xs={1} justifyContent={"flex-end"}>
          <IconButton onClick={openDeleteDialog}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
