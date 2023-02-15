import {
  Box,
  Button,
  ChakraProvider,
  Container,
  FormControl,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
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

      <ChakraProvider
       
      >
        <Helmet>
          <title>payment Method</title>
        </Helmet>
        
        <Text fontSize={"2xl"} textAlign="center">
          payment Method
        </Text>
        <form onSubmit={submitHandler}>
          <RadioGroup
        defaultValue="Itachi"

            //   justifyContent="center"
            //   alignItems="center"
          >
            <HStack
              spacing="-0.5%"
              display="flex"
              flexDirection="column"
              justifyContent={"space-around"}
              h="100px"
            >
              {/* <Radio
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                paypal
              </Radio>
              <Radio
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={paymentMethodName === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                Stripe
              </Radio> */}
              <Radio
                type="radio"
                id="bit"
                label="bit"
                value="bit"
                checked={paymentMethodName === "bit"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                ביט
              </Radio>
              <Radio
                type="radio"
                id="cash"
                label="cash"
                value="cash"
                checked={paymentMethodName === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                מזומן 
              </Radio>
              <Radio
                type="radio"
                id="payPal"
                label="payPal"
                value="payPal"
                checked={paymentMethodName === "payPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                PayPal 
              </Radio>
            </HStack>
          </RadioGroup>

          <Box display="flex" justifyContent="center" >
            <Button type="submit">Continue</Button>
          </Box>
        </form>
      </ChakraProvider>
    </>
  );
}

export default PaymentMethodScreen;
