import {
  Box,
  Button,
  Card,
  CardFooter,
  Center,
  Input,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckOutSteps from "./CheckOutSteps";

function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setcountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <Center h="86vh">
      <Card
        p="4%"
        bg="blackAlpha.200"
      >
        <Helmet>
          <title>Shiping Address</title>
        </Helmet>
        <Box textAlign="center">פרטי משתמש</Box>
        <form onSubmit={submitHandler}>
          <VStack
            spacing={4}
            align="stretch"
            zIndex={1}
          >
            <Box h="40px">
              <Input
                placeholder="Full name"
                size="lg"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </Box>

            <Box h="40px">
              <Input
                placeholder="Address"
                size="lg"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>

            <Box h="40px">
              <Input
                placeholder="City"
                size="lg"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </Box>

            <Box h="40px">
              <Input
                placeholder="Postal code"
                size="lg"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Box>

            <Box h="40px">
              <Input
                placeholder="Country"
                size="lg"
                value={country}
                required
                onChange={(e) => setcountry(e.target.value)}
              />
            </Box>
          </VStack>
          <CardFooter>
            <Button variant="primary" type="submit" border="1px solid">
              התחבר
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Center>
  );
}
export default ShippingAddressScreen;
