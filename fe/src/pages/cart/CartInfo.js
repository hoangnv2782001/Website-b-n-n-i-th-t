import React from "react";
import ShoppingCart from "../../components/ui/cart/Cart";
import OrderSummaryItem from "../../components/ui/cart/CartSumary";

const CartInfo = ({cart}) => {
  return (
    <>
      <ShoppingCart cartItems={cart.cartItems} />

      <OrderSummaryItem amount={cart.amount} quantity={cart.quantity}/>
    </>
  );
};

export default CartInfo;
