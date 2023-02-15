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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

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
  const RemoovItemHendler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      {cartItems.length === 0 ? (
        <Box bg="tomato"  w="100%" p={4} color="white">
          Cart is empty. <Link to="/">Go Shoping</Link>
        </Box>
      ) : (
        <Stack isInline gap={3} mt="4%" h="91vh">
          <Grid w="70%" h="50vh" ml="3%" >
            {cartItems.map((item) => (
              <GridItem  justifyContent="space-around" key={item._id}>
                <Card
                  display="flex"
                  justifyContent="space-around"
                  flexDirection="row"
                  alignItems="center"
                  w="90%"
                  bg="silver"
                  boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
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
                      color="black"
                      colorScheme="white"
                      onClick={() => UpdateCartHandler(item, item.quantity + 1)}
                      disabled={item.quantity === item.countInStock}
                    >
                      +
                    </Button>{" "}
                    <Text>{item.quantity}</Text>{" "}
                    <Button
                      color="black"
                      colorScheme="white"
                      borderRadius="50%"
                      onClick={() => UpdateCartHandler(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                  </Box>

                  <Box>{item.price}</Box>

                  <DeleteIcon
                    color="red.500"
                    onClick={() => RemoovItemHendler(item)}
                  />
                </Card>
              </GridItem>
            ))}
          </Grid>
          <hr />
          <Card bg="silver" w="30%" h="160px" display="flex">
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
              <Button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                bg="orange.300"
              >
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
