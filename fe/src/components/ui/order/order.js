import { faker } from "@faker-js/faker";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles, alpha } from "@mui/material/styles";
import { Minus, Plus } from "phosphor-react";
import { useState } from "react";
import { ShoppingCartRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../../redux/slices/cart";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const increment = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  

  const decrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleAddToCart = ()=>{

    dispatch(AddToCart({productId:product.id,quantity}))

  }

  return (
    <Stack direction={"row"} j>
      <img src={product.img} alt={faker.name.fullName()} />
      <Box >
        <Typography>Ten : {product.name}</Typography>
        <Typography>Gia : {product.price}</Typography>
        <Typography>So luong : {product.quantity}</Typography>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={decrement}>
            <Minus />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={increment}>
            <Plus />
          </IconButton>
        </Stack>
        <Button variant="outlined" startIcon={<ShoppingCartRounded />} onClick={handleAddToCart}>
          Add item
        </Button>
      </Box>
    </Stack>
  );
};

export default ProductInfo;
