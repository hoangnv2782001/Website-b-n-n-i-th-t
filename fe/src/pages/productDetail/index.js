import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import image from "../../assets/quan10.jpg";
import { faker } from "@faker-js/faker";
import {
  AddIcCallOutlined,
  PlusOne,
  Remove,
  RemoveCircle,
} from "@mui/icons-material";
import { CaretRight, Minus, Plus, ShoppingCart } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductInfo from "../../components/ui/product/ProductInfo";
import {
  getProduct,
  getProductsByCategory,
} from "../../service/productService";

import { AddToCart } from "../../redux/slices/cart";
import ProductDescrip from "../../components/ui/product/ProductDescrip";
import { formatNumber } from "../../utils/formatNumber";
import LoadingScreen from "../../components/ui/LoadingScreen";
import ProductRelated from "../../components/ui/product/ProductRelated";
const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [productRelated, setProductRelated] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    dispatch(
      AddToCart(
        { productId: id, quantity: quantity },
        navigate,
        location.pathname
      )
    );
  };
  useEffect(() => {
    getProduct(id)
      .then((response) => {
        console.log("product detail", response);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      getProductsByCategory(product.categoryId)
        .then((response) => {
          console.log("product relat", response);
          setProductRelated(response.data.data);
        })
        .catch((error) => {
          console.log("product relat", error);
        });
    }
  }, [id, product]);

  if (!product) return <LoadingScreen />;

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
        {product && (
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/category/${product.categoryId}`);
            }}
          >
            {" "}
            {product.category}
          </Typography>
        )}
        <CaretRight />
        {product && <Typography> {product.name}</Typography>}
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {product && (
          <Box sx={{ padding: "0px 15px" }} flexGrow={"1"}>
            <Stack
              direction={"row"}
              sx={{ marginTop: "16px", backgroundColor: "#fff" }}
              justifyContent={"space-between"}
            >
              <Box sx={{ padding: "15px", width: "365px", height: "365px" }}>
                <img
                  style={{ width: "350px", height: "350px" }}
                  src={product.img}
                  alt="dcfvgbnm,"
                />
              </Box>

              <Stack sx={{ flex: "1 1 auto" }}>
                <Stack spacing={2} p={"20px"}>
                  <Typography
                    variant="h4"
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      overflowWrap: "break-word",
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
                    Danh Mục: {product.category}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
                    Khối Lượng: {product.mass}Kg
                  </Typography>

                  <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
                    Số Lượng: {product.quantity}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
                    Giá: {formatNumber(product.price)}Đ
                  </Typography>
                  <Stack sx={{ marginTop: "15px", marginBottom: "15px" }}>
                    <ButtonGroup sx={{ marginTop: "20px" }}>
                      <Button aria-label="reduce" onClick={decrement}>
                        <Remove fontSize="small" />
                      </Button>
                      <Button>{quantity}</Button>
                      <Button aria-label="increase" onClick={increment}>
                        <Plus fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </Stack>

                  <Button
                    startIcon={<ShoppingCart />}
                    variant="outlined"
                    aria-label="increase"
                    onClick={handleAddToCart}
                    sx={{ width: "200px" }}
                  >
                    Thêm Vào Giỏ Hàng
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )}

        <Box sx={{ width: "30%", marginTop: "20px" }}>
          <Stack
            spacing={3}
            sx={{ backgroundColor: "#fff", padding: "15px 15px" }}
          >
            <Typography variant="caption">Bạn Có Thể Mua Hàng Tại</Typography>

            <Box
              sx={{
                border: "1px solid #d9d9d9",
                marginBottom: "20px",
                padding: "10px 15px",
              }}
            >
              <Typography variant="caption">Văn Phòng Tại Hà Nội</Typography>

              <Typography sx={{ marginTop: "20px" }}>
                Địa chỉ: Số 46, Đường Linh Đàm, Khu đô thị Bắc Linh Đàm, Hoàng
                Mai, Hà Nội
              </Typography>
            </Box>

            <Box
              sx={{
                border: "1px solid #d9d9d9",
                marginBottom: "20px",
                padding: "10px 15px",
              }}
            >
              <Typography variant="caption">Chi Nhánh Hồ Chí Minh </Typography>

              <Typography sx={{ marginTop: "20px" }}>
                Địa chỉ: 116 Nơ Trang Long, phường 14, Q. Bình Thạnh, TP.HCM
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
      {product && <ProductDescrip description={product.description} />}

      {productRelated && <ProductRelated products={productRelated} id={id}/>}
    </Box>
  );
};

export default ProductDetail;
