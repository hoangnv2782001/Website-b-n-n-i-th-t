import React from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/formatNumber";

export default function OrderSummaryItem({ amount, quantity }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "320px" }}>
      <Box
        sx={{
          background: "rgb(255, 255, 255)",
          borderRadius: "4px",
          paddingBottom: "8px",
        }}
      >
        {/* <List
          sx={{
            padding: "17px 20px",
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
            }}
          >
            <ListItemText>Tạm Tính</ListItemText>
            <ListItemText>{amount}đ</ListItemText>
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between, padding:0",
              padding: 0,
            }}
          >
            <ListItemText>Giảm Giá</ListItemText>
            <ListItemText>0đ</ListItemText>
          </ListItem>
        </List> */}

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ padding: "17px 20px" }}
        >
          <Typography>Tạm Tính</Typography>
          <Typography>{formatNumber(amount)}Đ</Typography>
        </Stack>
        <Divider />

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ padding: "17px 20px" }}
        >
          <Typography>Tổng Tiền</Typography>
          <Typography>{formatNumber(amount)}Đ</Typography>
        </Stack>
      </Box>

      <Button
        onClick={() => {
          navigate("/checkout");
        }}
        sx={{
          width: "100%",
          background: "rgb(255, 66, 78)",

          padding: "13px 10px",

          borderRadius: "4px",

          cursor: "pointer",
          margin: "15px 0px 0px",
        }}
        variant="contained"
      >
        Đặt Hàng
      </Button>
    </Box>
  );
}
