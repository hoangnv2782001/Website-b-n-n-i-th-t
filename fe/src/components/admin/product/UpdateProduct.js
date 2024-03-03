import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

import UpdateProductForm from "../../../components/ui/Form/UpdateProductForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductById } from "../../../redux/slices/product";

import LoadingScreen from "../../ui/LoadingScreen";
import { GetAllCategorys } from "../../../redux/slices/category";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.product);
  const { categorys } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(GetProductById(id));
    dispatch(GetAllCategorys());
   
  },[]);

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
        {!singleProduct || !categorys ? (
          <LoadingScreen />
        ) : (
          <UpdateProductForm singleProduct={singleProduct} categorys={categorys} />
        )}
      </Stack>
    </Box>
  );
};

export default UpdateProduct;
