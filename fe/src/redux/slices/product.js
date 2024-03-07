import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { ShowSnackbar } from "./app";

// Giá tri khởi tạo của sidebar state
const initialState = {
  products: [],
  singleProduct: null,

  productsNew: [],

  productSuggest: [],
  isLoading : false,
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
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload.products;
    },
    setProduct(state, action) {
      state.singleProduct = action.payload.singleProduct;
    },

    setProductsNew(state, action) {
      state.productsNew = action.payload.productsNew;
    },
  },
});

/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao action
 */
export default slice.reducer;

export function AddProduct(values, navigate) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios
      .post(
        "/products",
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
        navigate("/admin/product/all");
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function UpdateProduct(values, navigate) {
  return async (dispatch, getState) => {
    const id = values.id;
    delete values.id;
    const token = getState().auth.token;
    await axios
      .put(
        `/products/${id}`,
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
        navigate("/admin/product/all");
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetAllProducts() {
  return async (dispatch, getState) => {
    await axios
      .get("/products", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        dispatch(slice.actions.setProducts({ products: response.data }));

        console.log(response);
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetAllProductsNew() {
  return async (dispatch, getState) => {
    await axios
      .get("/products", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        const data = response.data.sort((a, b) => a.createdDate - b.createdDate);

        console.log("new prduct",data)
        dispatch(slice.actions.setProductsNew({productsNew : data.slice(0,Math.min(data.length,8))}))
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetProductById(id) {
  return async (dispatch, getState) => {
    await axios
      .get(`/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        dispatch(slice.actions.setProduct({ singleProduct: response.data }));
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function DeleteProduct(id,setIsDelete) {
  return async (dispatch, getState) => { 
    const token = getState().auth.token;
    await axios
      .delete(`/products/${id}`, {
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
        // const products = getState().product.products.filter(
        //   (item) => item.id !== id
        // );

        // dispatch(
        //   slice.actions.setProducts({
        //     products: products,
        //   })
        // );

        // console.log("categorý :", products);
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}
