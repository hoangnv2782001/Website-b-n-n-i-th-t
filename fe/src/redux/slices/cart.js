import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { ShowSnackbar } from "./app";
import { Navigate, useNavigate } from "react-router-dom";

// Giá tri khởi tạo của sidebar state
const initialState = {
  cartItems: [],
  amount: 0,
  quantity: 0,
  id: null,
  isLoading: false,
};

/**
 * Tao ra môt slice sử dung createSlice
 * Slice giup đơn giản hoá viêc tao các actions, creation action và reducer
 * @Param {Object}:
 *  @property name : tên slice
 *  @property initialState : giá tri khởi tao cuuả state
 *  @property reducers : các function câp nhât state
 */
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload.cart.cartItems;
      state.amount = action.payload.cart.amount;
      state.quantity = action.payload.cart.quantity;
      state.id = action.payload.cart.id;
    },
    setQuantity(state, action) {
      state.quantity += action.payload.quantity;
    },

    // increment(state, action) {
    //   state.cartItems.map((item) =>
    //     item.id === action.payload.cartItem.id ? action.payload.cartItem : item
    //   );

    //   state.amount = state.cartItems.reduce((sum, e) => e.amount + sum, 0);
    // },
    updateCart(state, action) {
      state.cartItems = action.payload.cartItems;
      state.amount += action.payload.amount;
      state.quantity = action.payload.quantity;
    },
  },
});

/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao action
 */
export default slice.reducer;
export function SetCart(values) {
  return async (dispatch, getState) => {
    const id = getState().cart.id;

    const cart = { ...values, id };
    dispatch(slice.actions.setCart(cart));
  };
}
export function AddToCart(values,navigate=null,next="/home") {
  
  return async (dispatch, getState) => {
    const cartId = getState().cart.id;
    const { token } = getState().auth;
    await axios
      .post(
        "/cart/items",
        { ...values, cartId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("add cart", response);
        dispatch(
          ShowSnackbar({ severity: "success", message: "Them Thanh Cong" })
        );

        dispatch(slice.actions.setQuantity({ quantity: response.data }));
      })
      .catch(function (error) {
        console.log("login error : ", error);
      
          navigate(`/auth/login?next=${next}`)
        
        // dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function UpdateCart(values) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    await axios
      .put(
        "/cart/items",
        { ...values },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);

        const cartItems = getState().cart.cartItems;

        const cartItem = response.data;
        let amount;

        const cartItemsNew = cartItems.map((item) => {
          if (item.id === cartItem.id) {
            amount = cartItem.amount - item.amount;
            return cartItem;
          }

          return item;
        });

        dispatch(
          slice.actions.updateCart({
            cartItems: cartItemsNew,
            amount,
            quantity: getState().cart.quantity,
          })
        );

        dispatch(
          ShowSnackbar({ severity: "success", message: "Cập nhật Thanh Cong" })
        );
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetCart(id) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    await axios
      .get(`/cart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch(slice.actions.setCart({ cart: response.data }));

        console.log("response cart", response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function DeleteCart(item) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    await axios
      .delete(`/cart/items/${item.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const cartItems = getState().cart.cartItems.filter(
          (e) => e.id !== item.id
        );
        const quantity = getState().cart.quantity - 1;

        dispatch(
          slice.actions.updateCart({
            cartItems,
            amount: -item.amount,
            quantity,
          })
        );
        dispatch(
          ShowSnackbar({ severity: "success", message: "Xoá Thành Công" })
        );

        console.log("item delete :", response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}
