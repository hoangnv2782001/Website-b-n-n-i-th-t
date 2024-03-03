import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <Stack sx={{ width: "100%" }}>
      {/* header chat */}
      <Header />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          backgroundColor: "rgb(240, 242, 245)",
        }}
        p={2}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Content;
