import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CartEmpty from "../../components/ui/cart/CartEmpty";

import { useDispatch, useSelector } from "react-redux";
import { GetCart } from "../../redux/slices/cart";
import CartInfo from "./CartInfo";

import {DeleteDialog} from '../../components/shared/dialog/DeleteDialog'

const Cart = () => {
  const cart = useSelector((state) => state.cart);



  const deleteDialog = useSelector((state) => state.app.deleteDialog);

  console.log("cart ", cart);

  const { id } = useSelector((state) => state.user);

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(GetCart(id));
    console.log("re-render");
  }, [id]);
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        width: "100%",
        minWidth: "1280px",
        maxWidth: "1440px",
        padding: "24px 24px 8px",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "10px" }} component={"div"}>
        Giỏ Hàng
      </Typography>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"nowrap"}
      >
        {cart.quantity === 0 ? <CartEmpty /> : <CartInfo cart={cart}/>}
      </Stack>

     
      {deleteDialog.open && <DeleteDialog {...deleteDialog}/>}
      
    </Box>
  );
};

export default Cart;
