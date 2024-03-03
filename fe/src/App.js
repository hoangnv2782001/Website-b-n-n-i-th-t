import Router from "./routers";
// theme
import ThemeProvider from "./theme";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseSnackbar } from "./redux/slices/app";
import { SetAuth } from "./redux/slices/auth";

import { useNavigate, useSearchParams } from "react-router-dom";

import LoadingScreen from "./components/ui/LoadingScreen";
import { CreateOrderWithPaymentOnline } from "./service/orderService";
import { SetCart } from "./redux/slices/cart";

const vertical = "top";
const horizontal = "right";
function App() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector(
    (state) => state.app.snackbar
  );
  const [query,setQuery] = useSearchParams();

  const responseCode = query.get("vnp_ResponseCode");

  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);

  const [isLoadingOnline, setIsLoadingOnline] = useState(() =>
    responseCode === "00" ? true : false
  );

  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    const responseCode = query.get("vnp_ResponseCode");

    if (responseCode === "00" ) {
      const paymentType = query.get("paymentType");
      const cartId = query.get("cartId");
      const amount = query.get("vnp_Amount");
      const address = decodeURIComponent(query.get("address"));
      const phone = query.get("phone");
      const note = decodeURIComponent(query.get("note"));
      const receiver = decodeURIComponent(query.get("receiver"));

      console.log(cartId, amount, address, phone, note, paymentType, receiver);

      CreateOrderWithPaymentOnline(
        { cartId, amount, address, phone, note, paymentType, receiver },
        token
      )
        .then((response) => {
          dispatch(
            SetCart({
              cart: {
                id: cartId.cartId,
                quantity: 0,
                amount: 0,
                cartItems: [],
              },
            })
          );
          navigate("/order-successfuly");
          console.log("payment online", response);
          setIsLoadingOnline(false)
        })
        .catch((error) => {
          console.log("payment online error", error);
          setIsLoadingOnline(false)
        });
    }

    
  }, []);

  useEffect(() => {
    console.log("local token", token);

    if (token && !isLoadingOnline) dispatch(SetAuth(token));
  }, [isLoggedIn,isLoadingOnline]);

  if (isLoading || isLoadingOnline) return <LoadingScreen />;
  return (
    <>
      {/* <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider> */}

      <ThemeProvider>
        <Router />
      </ThemeProvider>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(CloseSnackbar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(CloseSnackbar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default App;
