import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../../redux/slices/auth";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        marginTop: "20px",
        width: "25%",
        // backgroundColor: "#fff",
      }}
    >
      <Box sx={{ padding: "0px 15px", backgroundColor: "#fff" }}>
        <Typography variant="h5" sx={{ padding: "12px 0px" }}>
          Tài Khoàn của bạn
        </Typography>
        <Divider />

        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/profile/info");
              }}
            >
              <Typography> Thông Tin Tài Khoản</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              navigate("/profile/order");
            }}
          >
            <ListItemButton>Đơn Hàng</ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              navigate("/profile/change-password");
            }}
          >
            <ListItemButton>Đổi Mật Khẩu</ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              sx={{ color: "#FF000" }}
              onClick={() => {
                dispatch(Logout(navigate));
              }}
            >
              Đăng Xuất
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
