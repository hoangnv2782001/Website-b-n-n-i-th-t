import { Box, Stack } from "@mui/material";
import React from "react";
import Sidebar from "../../components/ui/home/Sidebar";
import HomeContent from "../../components/ui/home/HomeContent";
import Footer from "../../components/shared/footer";

const Home = () => {
  return (
    <Box
      sx={{
        width: "1280px",
        paddingLeft: "24px",
        paddingRight: "24px",
        marginRight: "13px",
        marginLeft: "13px",
       
      }}
    >
      <Stack
        direction={"row"}
        sx={{ paddingTop: "16px" }}
        justifyContent={"space-between"}
      >
        <Sidebar />
        <HomeContent />
      </Stack>
    </Box>
  );
};

export default Home;
