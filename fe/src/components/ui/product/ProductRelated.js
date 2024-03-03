import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

const ProductRelated = ({ products, id }) => {
  return (
    <Box
      sx={{ marginTop: "30px", padding: "15px 15px", backgroundColor: "#fff" }}
    >
      <Stack spacing={2}>
        <Typography variant="h4">Sản Phẩm Liên Quan</Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Grid container rowSpacing={4} spacing={5}>
            {products.map((e) => {
              if (e.id != id) {
                return (
                  <Grid key={e.id} item lg={2.2}>
                  
                    <ProductCard product={e} />
                  </Grid>
                );
              } else return null;
            })}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductRelated;
