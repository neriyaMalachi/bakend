import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  ChakraProvider,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import CheckOutSteps from "./CheckOutSteps";

function PlaceOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, useInfo } = state;

  return (
    <>
      <ChakraProvider>
        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
        <Helmet>
          <title>Preview Order</title>
        </Helmet>

        <Stack>
        {/* Grid for address */}
        <Grid
          dir="rtl"
          bg="whitesmoke"
          boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
        >
          <Text>Preview Order</Text>

          <GridItem>
            <Box
              w="7%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">שם:</Text>
              {"    "}
              {cart.shippingAddress.fullName}
            </Box>
            <Box
              w="35%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">כתובת:</Text>
              {cart.shippingAddress.address},{cart.shippingAddress.city},
              {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
            </Box>
          </GridItem>
          <Box color="blue">
            <Link to="/shipping">Edit:</Link>
          </Box>
        </Grid>




        {/* card for Method */}
        <Grid
          dir="rtl"
          bg="whitesmoke"
          boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
        >
          <Text>Preview Order</Text>

          <Box>
            <Box
              w="7%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">Method:</Text>
              {"    "}
              {cart.paymentMethod}
            </Box>

            {/* <Box
              w="23%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl">כתובת:</Text>
              {cart.shippingAddress.address},{cart.shippingAddress.city},
              {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
            </Box> */}
          </Box>
          <Box color="blue">
            <Link to="/payment">Edit:</Link>
          </Box>
        </Grid>
        {/* card for items */}
        <Stack justifyContent="space-around" h="120%" dir="rtl" bg="whitesmoke">
          <Text>Items</Text>

          {cart.cartItems.map((item) => (
            <Grid
            key={item._id}>
            <GridItem
             display="flex"
              w="70%"
              h="100%"
              justifyContent="space-around"
              alignItems="center"
              border=" 1px solid"
              borderRadius="6%"
            >
              <Box>
                <Image boxSize="100px" src={item.image} alt={item.name}></Image>
              </Box>
              <Box color="blue">
                <Link to={`/product/${item.slug}`}>{item.name}</Link>
              </Box>
              <Box>
                <Text>{item.quantity}</Text>
              </Box>
              <Box>
                <Text>{item.price}</Text>
              </Box>
            </GridItem>
            </Grid>
          ))}

          <Link to="/cart">Edit</Link>
        </Stack>



        </Stack>
      </ChakraProvider>
    </>
  );
}

export default PlaceOrderScreen;
