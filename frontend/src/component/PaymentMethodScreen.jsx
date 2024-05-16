import {
  Box,
  Button,
  Center,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
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
      <Helmet>
        <title>payment Method</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center h="70vh" bg="#393E46" display="flex" flexDirection="column">
          <RadioGroup
            bg="#222831"
            color="#EEEEEE"
            defaultValue="Itachi"
            borderRadius="20"
            p={{ base: "10%", sm: "4%" }}
          >
            <Text textAlign="center" justifyContent={"start"} fontSize="2xl">
              אמצעי תשלום
            </Text>
            <VStack h="100px">
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
            </VStack>
            <Box display="flex" justifyContent="center">
              <Button bg="#00ADB5" type="submit">
                להמשיך
              </Button>
            </Box>
          </RadioGroup>
        </Center>
      </form>
    </>
  );
}

export default PaymentMethodScreen;
