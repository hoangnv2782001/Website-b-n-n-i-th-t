import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import NewCategoryForm from "../../../components/ui/Form/NewCategoryForm";

const NewCategory = () => {
  return (
    <Box sx={{ width: "100%", marginTop : 3 }} >

    <Typography variant="h3" sx ={{margin : "0 10"}}>Tạo danh mục</Typography>
      <Stack p={3} sx={{ width: "100%",  backgroundColor: "#fff" }}  justifyContent={'center'}>
        <NewCategoryForm />
      </Stack>
    </Box>
  );
};

export default NewCategory;
