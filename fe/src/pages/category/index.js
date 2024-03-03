import {
  Autocomplete,
  Box,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CaretRight } from "phosphor-react";
import React, { useState } from "react";
import ProductCard from "../../components/ui/product/ProductCard";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LoadingScreen from "../../components/ui/LoadingScreen";
import { useEffect } from "react";

import { getProductsByCategory } from "../../service/productService";

const Category = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [param] = useSearchParams();

  const [page,setPage] = useState(1);

  const [products, setProducts] = useState(null);

  const [totalPage,setTotalPage] = useState(0);

 
  // const current_page = param.get("page")
  const sort = param.get("sort");
  useEffect(() => {
   
    const sort = param.get("sort");
    getProductsByCategory(id, sort?sort:"",page)
      .then((response) => {
        console.log("category response", response);
        setProducts(response.data.data);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        console.log("error ", error);
        setProducts(null);
      });
  }, [id,sort,page]);

  const handleSort = (e, newValue) => {
    if (newValue) {
      navigate(`/category/${id}?sort=${newValue.id}`);
    } else navigate(`/category/${id}`);
  };

  const handleChange = (event, value) => {
    if(sort)
    navigate(`/category/${id}?sort=${sort}&page=${value}`);
    navigate(`/category/${id}?page=${value}`);
    setPage(value);
    
  };

  if (!products) return <LoadingScreen />;
  return (
    <Box
      sx={{
        width: "1280px",
        paddingLeft: "24px",
        paddingRight: "24px",
        marginRight: "13px",
        marginLeft: "13px",
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ marginTop: "20px" }}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/home");
          }}
        >
          {"Trang chủ"}
        </Typography>
        <CaretRight />
        <Typography>{products[0].category}</Typography>
      </Stack>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={SORT}
        getOptionLabel={(item) => item.name}
        onChange={handleSort}
        sx={{ width: "150px",height:"30px",marginTop:"20px"}}
        renderInput={(params) => <TextField {...params} label="Sắp xếp" />}
      />

      <Grid sx={{ marginTop: "10px" }} container rowSpacing={4} spacing={5}>
        {products &&
          products.map((e) => (
            <Grid key={e.id} item lg={2.2}>
              <ProductCard product={e} />
            </Grid>
          ))}
      </Grid>

    <Stack sx={{mt:"10px"}} alignItems={"center"} justifyContent={"center"}>  <Pagination count={totalPage} page={page} onChange={handleChange} /></Stack>
    </Box>
  );
};

const SORT = [
  { id: "price,asc", name: "Giá Tăng Dần" },
  { id: "price,desc", name: "Giá Giảm Dần" },
];

export default Category;
