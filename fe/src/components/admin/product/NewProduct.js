import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

import NewProductForm from "../../../components/ui/Form/NewProductForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategorys } from "../../../redux/slices/category";
import LoadingScreen from "../../ui/LoadingScreen";

const NewProduct = () => {
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllCategorys());
    // rowchange(categorys);
  }, []);
  return (
    <Box sx={{ width: "100%", marginTop: 3 }}>
      <Typography variant="h3" sx={{ margin: "0 10" }}>
        Tạo Sản Phẩm Mới
      </Typography>
      <Stack
        p={3}
        sx={{ width: "100%", backgroundColor: "#fff" }}
        justifyContent={"center"}
      >
        {!categorys ? <LoadingScreen /> : <NewProductForm categorys={categorys} />}
      </Stack>
    </Box>
  );
};

export default NewProduct;
