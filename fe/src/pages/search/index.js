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
import React from "react";
import ProductCard from "../../components/ui/product/ProductCard";
import RHFAutocomplete from "../../components/ui/TextField/RHFAutocomplete";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetProducts } from "../../redux/slices/category";
import { searchProduct } from "../../service/productService";
import { useState } from "react";
import LoadingScreen from "../../components/ui/LoadingScreen";

const Search = () => {
  const [query] = useSearchParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const keyword = query.get("keyword");

  const [page, setPage] = useState(1);

  const [products, setProducts] = useState([]);

  const [totalPage, setTotalPage] = useState(0);

  const sort = query.get("sort");

  const handleChange = (event, value) => {
    if (sort) navigate(`/search?keyword=${keyword}?sort=${sort}&page=${value}`);
    navigate(`/search?keyword=${keyword}&page=${value}`);
    setPage(value);
  };

  const handleSort = (e, newValue) => {
    if (newValue) {
      navigate(`/search?keyword=${keyword}&sort=${newValue.id}`);
    } else navigate(`search?keyword=${keyword}`);
  };

  useEffect(() => {
    searchProduct(keyword, sort ? sort : "",page)
      .then((response) => {
        console.log("search   ", response);
        setProducts(response.data.data);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword, sort,page]);

  if (products.length < 0) return <LoadingScreen />;
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
        <Typography>{"Kết quả tìm kiếm"}</Typography>
      </Stack>

      <Stack direction={"row"} alignItems={"center"} sx={{ marginTop: "30px" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={SORT}
          onChange={handleSort}
          getOptionLabel={(item) => item.name}
          sx={{ width: "200px", height: "80px" }}
          renderInput={(params) => (
            <TextField {...params} label="---Sắp xếp theo---" />
          )}
        />
      </Stack>

      <Grid sx={{ marginTop: "30px" }} container rowSpacing={4} spacing={5}>
        {products &&
          products.map((e) => (
            <Grid key={e.id} item lg={2.2}>
              <ProductCard product={e} />
            </Grid>
          ))}
      </Grid>
      <Stack
        sx={{ mt: "10px" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {" "}
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
};

const SORT = [
  { id: "price,asc", name: "Giá Tăng Dần" },
  { id: "price,desc", name: "Giá Giảm Dần" },
];

export default Search;
