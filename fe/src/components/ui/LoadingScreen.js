import { Box, CircularProgress, Skeleton } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
