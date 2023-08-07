import {
  Box,
  Button,
  Center,
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
      <Helmet>
        <title>payment Method</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center
          h="82vh"
          color="black"
          bg="#116D6E"
          display="flex"
          flexDirection="column"
        >
          <RadioGroup  bg="#321E1E" color="white" defaultValue="Itachi" borderRadius="20%" p="5%" >
            <Text textAlign="center" fontSize="2xl" >אמצעי תשלום</Text>
            <HStack
              spacing="-0.5%"
              display="flex"
              flexDirection="column"
              justifyContent={"space-around"}
              h="100px"
            >
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
            <Box display="flex" justifyContent="center">
              <Button bg="#4E3636" type="submit">להמשיך</Button>
            </Box>
          </RadioGroup>
        </Center>
      </form>
    </>
  );
}

export default PaymentMethodScreen;
