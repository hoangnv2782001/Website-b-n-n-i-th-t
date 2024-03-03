import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { ShowSnackbar } from "./app";
import { SetCart } from "./cart";

// Giá tri khởi tạo của sidebar state
const initialState = {
  orders: [],
  isLoadingOnline: false,
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
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload.order);
    },
    setOrder(state, action) {
      state.orders = action.payload.orders;
    },

    setILoadingOn(state, action) {
      state.isLoadingOnline = true;
    },

    setILoadingOff(state, action) {
      state.isLoadingOnline = false;
    },
  },
});

/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao action
 */
export default slice.reducer;

export function CreateOrder(values, navigate) {
  return async (dispatch, getState) => {
    const cartId = getState().cart.id;
    const amount = getState().cart.amount;

    const token = getState().auth.token;
    await axios
      .post(
        "/order",
        { ...values, cartId, amount, paymentType: "COD" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: "Dat Hang Thanh Cong" })
        );

        dispatch(
          SetCart({
            cart: { id: cartId, quantity: 0, amount: 0, cartItems: [] },
          })
        );

        navigate("/order-successfuly");
      })
      .catch(function (error) {
        console.log(" error order : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function CreateOrderWithPaymentOnline(values, navigate, token) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setILoadingOn());

    console.log("'goi pyment online");
    await axios
      .post(
        "/order",
        { ...values },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log("order online ", response);
        dispatch(slice.actions.setILoadingOff());

        dispatch(
          SetCart({
            cart: { id: values.cartId, quantity: 0, amount: 0, cartItems: [] },
          })
        );
        navigate("/order-successfuly");
      })
      .catch(function (error) {
        console.log(" error order online: ", error);
        dispatch(slice.actions.setILoadingOff());
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}
export function ConfirmOrder(id, navigate) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios

      .put(
        `/order/confirm/${id}`,
        {},

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: "Xác Nhận Đơn Hàng Thành Công" })
        );

        navigate("/admin/order");
      })
      .catch(function (error) {
        console.log(" error order : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetOrder(id) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios
      .get(`/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch(slice.actions.setOrderDetail({ order: response.data }));

        console.log("setOrderDetail ", response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetAllOrders() {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios
      .get(`/order`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch(slice.actions.setOrder({ orders: response.data }));

        console.log("response order", response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
      });
  };
}

export function GetOrders() {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const { id } = getState().user;
    await axios
      .get(`/users/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch(slice.actions.setOrder({ orders: response.data }));

        console.log("response order", response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
      });
  };
}
