import React from "react";
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  console.log(cartItems);

  const UpdateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/propertis/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <h1>Shopping Cart</h1>
      <hr />
      {cartItems.length === 0 ? (
        <Box bg="tomato" w="100%" p={4} color="white">
          Cart is empty. <Link to="/">Go Shoping</Link>
        </Box>
      ) : (
        <Stack isInline gap={3}>
          <Grid w="100%">
            {cartItems.map((item) => (
              <GridItem gridGap={2} mt="2%" key={item._id}>
                <Card
                  direction={{ base: "column", xl: "row" }}
                  overflow="hidden"
                  variant="outline"
                  justifyContent="space-around"
                  alignItems="center"
                  w="100%"
                >
                  <Image
                    objectFit="cover"
                    h="90px"
                    w="90px"
                    src={item.image}
                    alt="Caffe Latte"
                  />

                  <Link to={`/product/${item.slug}`}>{item.name}</Link>

                  <Box
                    w="10%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    key={item._id}
                  >
                    <Button
                      borderRadius="50%"
                      variant="solid"
                      colorScheme="blue"
                      h="20%"
                      onClick={() => UpdateCartHandler(item, item.quantity + 1)}
                      disabled={item.quantity === item.countInStock}
                    >
                      +
                    </Button>{" "}
                    <Text>{item.quantity}</Text>{" "}
                    <Button
                      borderRadius="50%"
                      variant="solid"
                      colorScheme="blue"
                      h="20%"
                       onClick={() => UpdateCartHandler(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                  </Box>

                  <Box>{item.price}</Box>
                  <Button border="none" bg="white">
                    <DeleteIcon w={20} h={20} color="red.500" />
                  </Button>
                </Card>
                <hr />
              </GridItem>
            ))}
          </Grid>
          <hr />
          <Card bg="red" w="30%" h="160px" display="flex">
            <CardBody>
              <h3 dir="rtl">
                כמות מוצרים {" - "}{" "}
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
                <hr />
                ש"ח : {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h3>
              <hr />
            </CardBody>
            <CardFooter>
              <Button disabled={cartItems.length === 0}>
                Process to Checkout
              </Button>
            </CardFooter>
          </Card>
        </Stack>
      )}
    </>
  );
}

export default CartScreen;
