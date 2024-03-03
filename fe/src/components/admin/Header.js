import { fa, faker } from "@faker-js/faker";
import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import React from "react";
import avatar from "../../assets/avatar.png";

import { useDispatch, useSelector } from "react-redux";

/**
 * Hiển thi header khung chat
 * @returns {Component}
 */
const Header = () => {
  // khoi tao theme
  const theme = useTheme();

  // khởi tao dispatch
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.user);

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 10px rgba(0 ,0 ,0 ,0.25)",
      }}
    >
      <Stack
        alignItems={"center"}
        direction="row"
        justifyContent="flex-end"
        sx={{ cursor: "pointer", width: "'100%", height: "100%" }}
      >
        <Stack sx={{}} alignItems={"center"} direction="row" spacing={1}>
          <Avatar src={avatar} />

          <Typography>{name}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
