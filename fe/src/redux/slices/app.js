import { createSlice } from "@reduxjs/toolkit";

// Giá tri khởi tạo của sidebar state
const initialState = {
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },

  deleteDialog: {
    open: false,
    title: null,
    message: null,
    handleSubmit: null,
    handleCancel: null,
  },
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
  name: "app",
  initialState,
  reducers: {
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },

    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
      state.snackbar.severity = null;
    },

    openDeleteDialog(state, action) {
      state.deleteDialog.open = true;
      state.deleteDialog.title = action.payload.title;
      state.deleteDialog.message = action.payload.message;
      state.deleteDialog.handleSubmit = action.payload.handleSubmit;
      state.deleteDialog.handleCancel = action.payload.handleCancel;
    },

    closeDeleteDialog(state, action) {
      state.deleteDialog.open = false;
      state.deleteDialog.title = null;
      state.deleteDialog.message = null;
      state.deleteDialog.handleSubmit = null;
      state.deleteDialog.handleCancel = null;
    },
  },
});

/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao action
 */
export default slice.reducer;

/**
 * hiem thi message thong bao
 * @param {*} values info register pass
 * @returns
 */
export function ShowSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );
    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };
}

export function ShowDeleteDialog(params) {
  console.log("error", params);
  return async (dispatch, getState) => {
    dispatch(slice.actions.openDeleteDialog({ ...params }));
  };
}

export function CloseDeleteDialog() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeDeleteDialog());
  };
}

/**
 * đóng thông bád
 * @param {*} values info register pass
 * @returns
 */
export function CloseSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar());
  };
}
