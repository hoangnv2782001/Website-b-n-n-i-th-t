import { Box, Container, Stack } from "@mui/material";
import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";

/**
 * Layout chinh cua app
 * @returns {Component}
 */
const MainLayout = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F7F7F7",
      }}
      justifyContent={"space-between"}
    >
      <Header />

      <Stack direction={"row"} justifyContent={"sp"} sx={{ height: "100%" }}>
        <Container sx={{ mt: 5 }} maxWidth="sm">
          {/* Logo web main layout */}
          <Stack spacing={5}>
            <Stack
              sx={{ width: "100%" }}
              alignItems={"center"}
              direction="column"
            ></Stack>
          </Stack>
          {/* hien thi comonent sau khi truy cap riuter */}
          <Outlet />
        </Container>
      
      </Stack>

      <Footer />
    </Stack>
  );
};

export default MainLayout;
