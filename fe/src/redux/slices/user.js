import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { ShowSnackbar } from "./app";

// Giá tri khởi tạo của loggin state
const initialState = {
  email: "",
  address: "",
  id: null,
  phone: "",
  name: "",
  role : "",
  isLoadingUser : false,
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
    setUser(state, action) {
      state.email = action.payload.user.email;
      state.address = action.payload.user.address;
      state.id = action.payload.user.id;
      state.phone = action.payload.user.phone;
      state.name = action.payload.user.name;
      state.role = action.payload.user.role;
    },

   
  },
});

export default slice.reducer;

export function GetUser(data) {
  return async (dispatch, getState) => {
    await axios
      .get(`/users/${data.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then(function (response) {
        dispatch(slice.actions.setUser({ user: response.data }));

        console.log("response cart", response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
      });
  };
}



export function UpdateUser(data) {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    await axios
      .put(
        `/users`,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      )
      .then(function (response) {
        dispatch(slice.actions.setUser({ user: data }));

        console.log("response cart", response);

        dispatch(ShowSnackbar({severity : "success",message:"Thanh Cong"}))
      })
      .catch(function (error) {
        console.log("login error : ", error);
      });
  };
}

export function SetUser(data) {
  return async (dispatch, getState) => {
    console.log("set user")
    dispatch(slice.actions.setUser({ user: data }));
  };
}
