import { configureStore } from "@reduxjs/toolkit";
import { listProductSlice, productDetailsSlice } from "./features/Product/productSlice";
import { cartSlice } from "./features/cart/cartSlice";
import {userLoginSlice,userRegisterSlice,userDetailsSlice,userUpdateProfileSlice} from "./features/User/userSlice";
import { orderCreateSlice,orderDetailsSlice,orderListMySlice } from "./features/Order/orderSlice";
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

  const  shippingAddressFromLocalStorage=localStorage.getItem('shippingAddress')?
  JSON.parse(localStorage.getItem('shippingAddress')) : {}
  
  const  paymentMethodFromLocalStorage=localStorage.getItem('paymentMethod')?
  JSON.parse(localStorage.getItem('paymentMethod')) : ''

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress:shippingAddressFromLocalStorage,
    paymentMethod:paymentMethodFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const rootReducer = {
  listProduct: listProductSlice.reducer,
  productDetails: productDetailsSlice.reducer,
  cart: cartSlice.reducer,
  userLogin: userLoginSlice.reducer,
  userRegister: userRegisterSlice.reducer,
  userDetails: userDetailsSlice.reducer,
  userUpdateProfile:userUpdateProfileSlice.reducer,
  orderCreate:orderCreateSlice.reducer,
  orderDetails:orderDetailsSlice.reducer,
  orderListMy:orderListMySlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: true,
});

export default store;
