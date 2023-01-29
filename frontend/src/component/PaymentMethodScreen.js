import { Box, Button, Container } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { Helmet } from "react-helmet-async";
import useNavigate from "react-router-dom";
import { Store } from "../Store";
function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethhod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <Container>
        <Helmet>
          <title>payment Method</title>
        </Helmet>
        <h1>payment Method</h1>
        <form onSubmit={submitHandler}>
          <Box
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Box>
          <Box
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Box>

          <Box>
            <Button type="submit">Continue</Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default PaymentMethodScreen;
