import {
  AspectRatio,
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

        <Stack dir="rtl" gap={4}>
          
          {/* Grid for address */}
          <Grid
            dir="rtl"
            bg="whitesmoke"
            boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
            w="70%"
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

          {/* Grid for Method */}
          <Grid
            dir="rtl"
            bg="whitesmoke"
            boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
            w="70%"
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

          {/* Stack for items */}
          <Stack
            justifyContent="space-around"
            dir="rtl"
            bg="whitesmoke"
            w="70%"
            boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
          >
            <Text>Items</Text>

            {cart.cartItems.map((item) => (
              <Grid key={item._id}>
                <GridItem
                  display="flex"
                  w="70%"
                  h="100%"
                  justifyContent="space-around"
                  alignItems="center"
                  border=" 1px solid"
                  bg="red"
                >
                  <GridItem>
                    <Image
                      w="60px"
                      h="60px"
                      src={item.image}
                      alt={item.name}
                      objectFit="contain"
                    />
                  </GridItem>

                  <GridItem>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </GridItem>
                  <GridItem>
                    <Text>{item.quantity}</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{item.price}</Text>
                  </GridItem>
                </GridItem>
              </Grid>
            ))}

            <Link to="/cart">Edit</Link>
          </Stack>
          <Grid>
{/* Stack for order summary */}
          <Stack>
          <Grid>
            <GridItem
              bg="tomato"
              //  colSpan={1}
              //   rowSpan={4}
              w="30%"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <h1>tomato</h1>
            </GridItem>
          </Grid>
        </Stack>

        </Grid>
        </Stack>
       
      </ChakraProvider>
    </>
  );
}

export default PlaceOrderScreen;
