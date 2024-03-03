import { combineReducers } from "redux";

import authReducer from "./slices/auth";
import appReducer from "./slices/app";
import categoryReducer from "./slices/category";


import cartReducer from "./slices/cart";

import userReducer from "./slices/user";

import orderReducer from "./slices/order";

import productReducer from "./slices/product"

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  category: categoryReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  product:productReducer
});

export { rootReducer };
