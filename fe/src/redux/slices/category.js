import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { ShowSnackbar } from "./app";

// Giá tri khởi tạo của sidebar state
const initialState = {
  categorys: [],
  singleCategory: null,
  products: [],

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
  name: "category",
  initialState,
  reducers: {
    setCategorys(state, action) {
      state.categorys = action.payload.categorys;
    },
    setCategory(state, action) {
      state.singleCategory = action.payload.singleCategory;
    },

    setProducts(state, action) {
      state.products = action.payload.products;
    },
  },
});

/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao action
 */
export default slice.reducer;

export function AddCategory(values, navigate) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios
      .post(
        "/categorys",
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
        dispatch(
          ShowSnackbar({ severity: "success", message: "Them Thanh Cong" })
        );
        navigate("/admin/category/all");
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function UpdateCategory(values, navigate) {
  return async (dispatch, getState) => {
    const id = values.id;
    delete values.id;
    const token = getState().auth.token;
    await axios
      .put(
        `/categorys/${id}`,
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
        dispatch(
          ShowSnackbar({ severity: "success", message: "Cập nhật Thanh Cong" })
        );
        navigate("/admin/category/all");
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetAllCategorys(values) {
  return async (dispatch, getState) => {
    await axios
      .get("/categorys", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        dispatch(slice.actions.setCategorys({ categorys: response.data }));

        console.log(response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetCategoryById(id) {
  return async (dispatch, getState) => {
    await axios
      .get(`/categorys/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        dispatch(slice.actions.setCategory({ singleCategory: response.data }));
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function DeleteCategory(id,setIsDelete) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios
      .delete(`/categorys/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch(
          ShowSnackbar({ severity: "success", message: "Xoá Thành Công" })
        );
        setIsDelete(a=>!a)

        // const categorys = getState().category.categorys.filter(
        //   (item) => item.id !== id
        // );

        // dispatch(
        //   slice.actions.setCategorys({
        //     categorys: categorys,
        //   })
        // );

        // console.log("categorý :", categorys);
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
        setIsDelete(a=>!a)
      });
  };
}
