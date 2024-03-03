import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import Banner1 from "../../../assets/banner1.jpg";
import Banner2 from "../../../assets/banner2.jpg";
import Banner3 from "../../../assets/banner3.jpg";
import Banner4 from "../../../assets/banner4.jpg";
import ProductCard from "../product/ProductCard";

import Carousel from "react-material-ui-carousel";
import { useEffect } from "react";
import { getProducts } from "../../../service/productService";

const banner = [Banner1, Banner2, Banner3, Banner4];

const HomeContent = () => {
  const [productsNew, setProductsNew] = useState(null);

  const [productsSale, setProductsSale] = useState(null);

  useEffect(() => {
    getProducts("new")
      .then((response) => {
        console.log("new ", response);
        setProductsNew(response.data);
      })
      .catch((error) => {
        console.log("new ", error);
        setProductsNew([]);
      });
  }, []);

  useEffect(() => {
    getProducts("sale")
      .then((response) => {
        console.log("sale ", response);
        setProductsSale(response.data);
      })
      .catch((error) => {
        console.log("new ", error);
        setProductsSale([]);
      });
  }, []);

  console.log("new ", productsNew);
  return (
    <Stack
      sx={{ width: "calc(100% - 254px)", overflowX: "hidden" }}
      gap={"16px"}
    >
      <Box
        sx={{
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Carousel sx={{ width: "100%", height: "100%" }}>
          {banner.map((e, i) => (
            <img
              src={e}
              alt={"qwertyu"}
              style={{ width: "100%", height: "100%" }}
              key={i}
            />
          ))}
        </Carousel>
      </Box>

      <Stack
        spacing={5}
        sx={{
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography variant="h5">Sản Phẩm Mới</Typography>

        <Grid container rowSpacing={4} spacing={1}>
          {productsNew &&
            productsNew.map((e) => (
              <Grid key={e.id} item lg={3}>
                <ProductCard product={e} />
              </Grid>
            ))}
        </Grid>
      </Stack>

      <Stack
        spacing={5}
        sx={{
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography variant="h5">Bạn Có Thể Thích</Typography>

        <Grid container rowSpacing={4} spacing={1}>
          {productsSale &&
            productsSale.map((e) => (
              <Grid key={e.id} item lg={3}>
                <ProductCard product={e} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default HomeContent;
