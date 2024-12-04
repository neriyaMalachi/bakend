import {
  Box,
  Button,
  Card,
  CardFooter,
  Center,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import countrys from "../data";

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
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

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
    <Center h="86vh" bg="#393E46">
      <Card p="4" bg="#222831" color="#EEEEEE" borderRadius="lg" boxShadow="md">
        <Helmet>
          <title>פרטי משתמש</title>
        </Helmet>
        <Box textAlign="center" fontSize="2xl" mb="4">
          פרטי משתמש
        </Box>
        <form onSubmit={submitHandler}>
          <VStack spacing={4} align="stretch" dir="rtl">
            <Box>
              <Input
                placeholder="שם מלא"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </Box>

            <Box>
              <Input
                placeholder="כתובת"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>

            <Box>
              <Input
                placeholder="עיר"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </Box>

            <Box>
              <Input
                placeholder="מיקוד"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Box>

            <Box>
              <Select
                placeholder="ארץ"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
                bg="#222831"
                color="#EEEEEE"
              >
                {countrys.countrys.map((getcountry, index) => (
                  <option
                    key={index}
                    style={{
                      backgroundColor: "#222831",
                      color: "#EEEEEE",
                    }}
                    value={getcountry.code}
                  >
                    {getcountry.name}
                  </option>
                ))}
              </Select>
            </Box>
          </VStack>
          <CardFooter>
            <Button type="submit" bg="#00ADB5" color="white" _hover={{ bg: "#009a9e" }}>
              המשך לתשלום
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Center>
  );
}

export default ShippingAddressScreen;
