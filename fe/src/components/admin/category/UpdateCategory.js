import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

import UpdateCategoryForm from "../../../components/ui/Form/UpdateCategoryForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryById } from "../../../redux/slices/category";

import LoadingScreen from "../../ui/LoadingScreen";

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleCategory } = useSelector((state) => state.category);

  const {token} = useSelector(state=>state.auth)

  useEffect(() => {
    dispatch(GetCategoryById(id,token));
    console.log("sign  ", singleCategory);
  }, []);

  return (
    <Box sx={{ width: "100%", marginTop: 3 }}>
      <Typography variant="h3" sx={{ margin: "0 10" }}>
        Cập nhật danh mục
      </Typography>
      <Stack
        p={3}
        sx={{ width: "100%", backgroundColor: "#fff" }}
        justifyContent={"center"}
      >
        {!singleCategory ? (
          <LoadingScreen />
        ) : (
          <UpdateCategoryForm
            name={singleCategory.name}
            description={singleCategory.description}
            image={singleCategory.img}
            id={singleCategory.id}
          />
        )}
      </Stack>
    </Box>
  );
};

export default UpdateCategory;
