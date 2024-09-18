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
  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || "PayPal");

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <>
      <Helmet>
        <title>אמצעי תשלום</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center h="100vh" bg="#393E46" p={4}>
          <Box
            bg="#222831"
            color="#EEEEEE"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            maxW="400px"
            w="full"
          >
            <Text textAlign="center" fontSize="2xl" mb={4}>
              אמצעי תשלום
            </Text>
            <RadioGroup
              value={paymentMethodName}
              onChange={(value) => setPaymentMethod(value)}
            >
              <VStack spacing={4}>
                <Radio
                  value="bit"
                  colorScheme="cyan"
                  size="lg"
                >
                  ביט
                </Radio>
                <Radio
                  value="cash"
                  colorScheme="cyan"
                  size="lg"
                >
                  מזומן
                </Radio>
                <Radio
                  value="payPal"
                  colorScheme="cyan"
                  size="lg"
                >
                  PayPal
                </Radio>
              </VStack>
            </RadioGroup>
            <Box mt={6} textAlign="center">
              <Button
                bg="#00ADB5"
                color="white"
                _hover={{ bg: "#009a9e" }}
                type="submit"
                size="lg"
                px={6}
                py={3}
                borderRadius="md"
              >
                להמשיך
              </Button>
            </Box>
          </Box>
        </Center>
      </form>
    </>
  );
}

export default PaymentMethodScreen;
