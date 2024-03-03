import { Shop } from "@mui/icons-material";
import { Stack, Box, Typography } from "@mui/material";
import React from "react";

import OrderNew from './OrderNew'

const Card = ({name,bg,quantity,icon,...other}) => {
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        height: "120px",
        backgroundColor: bg,
        borderRadius: "8px",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        sx={{ color: "#fff", height: "100%", width: "100%" }}
      >
        {/* <Shop sx={{ height: "50%", width: "50%" }} /> */}
        {icon}
        <Stack flexGrow={1} spacing={1} alignItems={"'center"}>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="subtitle1">{quantity}</Typography>
        </Stack>
      </Stack>


    
    </Box>
  );
};

export default Card;
