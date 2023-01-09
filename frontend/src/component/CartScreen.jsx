import React from "react";
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
<>
<Helmet>
<title>Shopping Cart</title>
</Helmet>

<h1>Shopping Cart</h1>

</>
  );
}

export default CartScreen;
