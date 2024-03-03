import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { ShowSnackbar } from "./app";
import { GetCart, SetCart } from "./cart";
import { GetUser, SetUser } from "./user";

// Giá tri khởi tạo của loggin state
const initialState = {
  isLoggedIn: false,
  token: "",
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
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },

    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },

    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao creation action
 */
export default slice.reducer;

export function SetAuth(token) {
  return async (dispatch, getState) => {

    console.log("set auth state",getState().auth.isLoading,getState().auth.isLoggedIn)
    dispatch(slice.actions.updateIsLoading({ isLoading: true }));
    await axios
      .get("/users/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);

        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: token,
          })
        );

        dispatch(SetUser(response.data));

        dispatch(GetCart(response.data.id));

        dispatch(slice.actions.updateIsLoading({ isLoading: false }));
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(slice.actions.updateIsLoading({ isLoading: false }));
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

/**
 * Call api login
 * @param {*} values : login inffo
 * @returns
 */
export function Login(values, navigate, url) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        { ...values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          ShowSnackbar({ severity: "success", message: "Đăng nhập thành công" })
        );
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        console.log("url",url)

        window.localStorage.setItem("access_token", response.data.token);

        if(response.data.role === 'ADMIN')
        navigate('/admin')
      else
        navigate(url ? url : "/home");
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

/**
 * Logout clear token
 * @returns
 */
export function Logout(navigate) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());

    const cart = {
      id: null,
      cartItems: [],
      amount: 0,
      quantity: 0,
    };
    dispatch(SetCart({ cart }));
    dispatch(
      SetUser({
        user: { email: "", address: "", id: null, phone: "", name: "" },
      })
    );
    navigate("/home");
    // store userid
    window.localStorage.removeItem("access_token");

    window.location.reload();
  };
}

/**
 * Xử lí forgot password
 * @param {*} values info forgot pass
 * @returns
 */
export function ForgotPassword(values, navigate) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/password/forgot",
        {},
        {
          params: values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

/**
 * Xử lí forgot password
 * @param {*} values info forgot pass
 * @returns
 */
export function NewPassword(values,navigate) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/password/reset",

        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(
          ShowSnackbar({
            severity: "success",
            message: "Đổi Mật Khẩu Thành Công",
          })
        );
        navigate("/home")
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

/**
 * Xử lí register
 * @param {*} values info register pass
 * @returns
 */
export function Register(values, navigate) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true}));
    await axios
      .post(
        "/auth/register",

        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

       
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false })
        );

        dispatch(
          ShowSnackbar({ severity: "success", message: "Đăng Kí Thành Công" })
        );
        navigate(`/auth/verify?email=${values.email}`);
      })
      .catch(function (error) {
        console.log("error",error);
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false})
        );

        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      })
      // .finally(function () {
      //   if (!getState().auth.error) {
          
      //   }
      //   console.log("email đk :", values.email);
      // });
  };
}

/**
 * Xử lí register
 * @param {*} values info register pass
 * @returns
 */
export function VerifyEmail(values,navigate) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/register/verification",

        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(
          ShowSnackbar({ severity: "success", message: "Xac Thuc thành công" })
        );

        // store userid
        window.localStorage.setItem("access_token", response.data.token);

        navigate("/home")
      })
      .catch(function (error) {
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}
