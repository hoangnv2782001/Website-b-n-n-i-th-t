import React, { useState } from "react";
import { Logout as SignOut } from "../../redux/slices/auth";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";

import { useTheme } from "@mui/material/styles";

import { faker } from "@faker-js/faker";

import useSettings from "../../hooks/useSettings";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout, ShoppingCart } from "@mui/icons-material";


/**
 * SideBar chua cac btton chuc nang
 * state :
 *   anchorEl : phàn tử liên kết với menu
 *   open : trang thái đóng mở menu
 * @function handleClick : sưu kiên click avatar
 * @function handleClose : sự kiên close menu
 * @returns {Component}
 */
const SideBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const iconButton = createIconButton();
  return (
    <Stack sx={{ height: "100vh", overflow: "hidden" }} direction="row">
      {/*left panel */}
      <Box
        sx={{
          width: "300px",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0)",
          color: "rgb(255, 255, 255)",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={3} spacing={5}>
          {/* setting header */}
          <Stack direction="row" alignItems={"center"} spacing={3}>
            <Typography variant="h6">Quản Trị Website</Typography>
          </Stack>

          <Stack spacing={2}>
            {iconButton.map((element) => {
              return (
                <>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },

                      borderRadius: 1,
                    }}
                    p={1.5}
                    spacing={2}
                    onClick={() => {
                      if (6 !== element.key) {
                        navigate(element.link);
                      } else {
                        dispatch(SignOut(navigate));
                      }
                    }}
                  >
                    <Stack alignItems={"center"} direction="row" spacing={2}>
                      {element.icon}
                      <Typography variant="body2">{element.heading}</Typography>
                    </Stack>
                  </Stack>
                </>
              );
            })}
          </Stack>
        </Stack>
      </Box>
      {/* right panel */}
    </Stack>
  );
};

/**
 * Tạo các icon button hiển thị chức năng trong setting
 * @param {Callback} handleOpenShortcuts
 * @returns
 */

const createIconButton = () => {
  return [
    {
      key: 0,
      icon: <UilEstate />,
      heading: "Trang Chủ",
      link: "/admin/dashboard",
    },
    {
      key: 1,
      icon: <UilClipboardAlt />,
      heading: "Đơn Hàng",
      link: "/admin/order",
    },
    {
      key: 2,
      icon: <UilPackage />,
      heading: "Danh Mục",
      link: "/admin/category",
    },
    {
      key: 3,
      icon: <ShoppingCart />,
      heading: "Sản Phẩm",
      link: "/admin/product",
    },
    {
      key: 4,
      icon: <UilUsersAlt />,
      heading: "Khách Hàng",
      link: "/admin/user",
    },
    {
      key: 5,
      icon: <UilChart />,
      heading: "Thống Kê",
      link: "/admin/statistic",
    },
    {
      key: 6,
      icon: <Logout />,
      heading: "Đăng Xuẩt",
      link: "",
    },
  ];
};
export default SideBar;
