import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import UpdateProductForm from "../../../components/ui/Form/UpdateProductForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductById } from "../../../redux/slices/product";

import LoadingScreen from "../../ui/LoadingScreen";
import { GetAllCategorys } from "../../../redux/slices/category";
import { getProduct } from "../../../service/productService";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { singleProduct } = useSelector((state) => state.product);
  const { categorys } = useSelector((state) => state.category);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  console.log("update product")
  useEffect(() => {

    console.log("get product")
    getProduct(id)
      .then((response) => {
        console.log("response", response)
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error",err);
        setLoading(false);
      });
    dispatch(GetAllCategorys());
  }, [id]);

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={{ width: "100%", marginTop: 3 }}>
      <Typography variant="h3" sx={{ margin: "0 10" }}>
        Cập Nhật Sản Phẩm
      </Typography>
      <Stack
        p={3}
        sx={{ width: "100%", backgroundColor: "#fff" }}
        justifyContent={"center"}
      >
        <UpdateProductForm singleProduct={product} categorys={categorys} />
      </Stack>
    </Box>
  );
};

export default UpdateProduct;
