import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import { toast } from "react-toastify";
import { Store } from "../Store";
import LoadingBox from "../component/LoadingBox";
import { getError } from "../utils";
import Media from "react-media";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };

    default:
      return state;
  }
};

function PlaceOrderScreen() {
  const navigate = useNavigate();
  // const clientId = "AZKL-OCyN36PITH8tkDGcX0aznF66Hgui7spphjCtXcs3opUgVSd6mzFW-xAnR9MG-NCVMIm5BoYMZG_"
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(0);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <Media query="(min-width: 990px)">
        {(matches) => {
          return matches ? (
            <Grid
              dir="rtl"
              gap={100}
              templateRows="repeat12, 1fr)"
              templateColumns="repeat(2, 1fr)"
              h="91vh"
            >
              <Grid gap={45}>
                {/* Grid for address */}
                <Grid
                  dir="rtl"
                  bg="whitesmoke"
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  w="100%"
                  rowSpan={2}
                  colSpan={1}
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
                      w="40%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontSize="xl">כתובת:</Text>
                      {cart.shippingAddress.address},{cart.shippingAddress.city}
                      ,{cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}
                    </Box>
                  </GridItem>
                  <Box color="blue">
                    <Link to="/shipping">שינוי:</Link>
                  </Box>
                </Grid>

                {/* Grid for Method */}
                <Grid
                  dir="rtl"
                  bg="whitesmoke"
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  w="100%"
                >
                  <Text>שיטת תשלום</Text>

                  <Box>
                    <Box
                      w="20%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontSize="xl">Method:</Text>
                      {"    "}
                      {cart.paymentMethod}
                    </Box>
                  </Box>
                  <Box color="blue">
                    <Link to="/payment">שינוי:</Link>
                  </Box>
                </Grid>

                {/* Stack for items */}
                <Grid
                  dir="rtl"
                  bg="whitesmoke"
                  w="100%"
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                >
                  <Text>פריטים</Text>

                  {cart.cartItems.map((item) => (
                    <Grid key={item._id}>
                      <GridItem
                        display="flex"
                        w="100%"
                        h="100%"
                        justifyContent="space-around"
                        alignItems="center"
                        border=" 1px solid"
                        bg="silver"
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

                        <GridItem color="blue.400">
                          {/* <Link to={`/product/${item.slug}`}>{item.name}</Link> */}
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

                  <Link to="/cart">שינוי:</Link>
                </Grid>
              </Grid>
              {/* Stack for order summary */}

              <Grid display="flex" textAlign="center" justifyContent="center">
                <GridItem
                  w="60%"
                  h="55%"
                  border="1px solid"
                  borderRadius="30%"
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  bg="whitesmoke"
                >
                  <Text fontSize="2xl">Order Summary</Text>

                  <GridItem>
                    <Text>Item</Text>
                    <Text>${cart.itemsPrice.toFixed(2)}</Text>
                  </GridItem>
                  <hr />
                  <GridItem>
                    <Text>Shipping</Text>
                    <Text>${cart.shippingPrice.toFixed(2)}</Text>
                  </GridItem>
                  <hr />
                  <GridItem>
                    <Text>Tax</Text>
                    <Text>${cart.taxPrice.toFixed(2)}</Text>
                  </GridItem>
                  <hr />
                  <GridItem>
                    <Text fontSize="2xl"> Order Total</Text>

                    <Text>${cart.totalPrice.toFixed(2)} </Text>
                  </GridItem>

                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                    bg="silver"
                  >
                    Place Order
                  </Button>
                </GridItem>
                {loading && <LoadingBox></LoadingBox>}
              </Grid>
            </Grid>
          ) : (
            <Box bg="white">
              <Center dir="rtl">
                <Flex
                  flexDirection="column"
                  justifyContent="space-around"
                  h="60vh"
                  w="100%"
                >
                  {/* Grid for address */}
                  <Flex
                    dir="rtl"
                    bg="whitesmoke"
                    boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                    w="49vh"
                    flexDirection="column"
                  >
                    <Text>תצוגת הזמנה</Text>

                    <Box
                      w="17%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontSize="xl">שם:</Text>
                      {"    "}
                      {cart.shippingAddress.fullName}
                    </Box>
                    <Box
                      w="90%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontSize="xl">כתובת:</Text>
                      {cart.shippingAddress.address},{cart.shippingAddress.city}
                      ,{cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}
                    </Box>

                    <Box color="blue">
                      <Link to="/shipping">עדכן:</Link>
                    </Box>
                  </Flex>

                  {/* Grid for Method */}
                  <Box
                    dir="rtl"
                    bg="whitesmoke"
                    boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                    w="100%"
                  >
                    <Text>פירטי תשלום</Text>

                    <Box>
                      <Box
                        w="30%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text fontSize="sm">שיטת תשלום:</Text>
                        {"    "}
                        {cart.paymentMethod}
                      </Box>
                    </Box>
                    <Box color="blue">
                      <Link to="/payment">עדכן:</Link>
                    </Box>
                  </Box>

                  {/* Stack for items */}

                  <Box
                    dir="rtl"
                    bg="whitesmoke"
                    w="100%"
                    boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  >
                    <Text>פריטים</Text>

                    {cart.cartItems.map((item) => (
                      <Grid key={item._id}>
                        <GridItem
                          display="flex"
                          w="100%"
                          h="100%"
                          justifyContent="space-around"
                          alignItems="center"
                          border=" 1px solid"
                          bg="whitesmoke"
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
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
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
                    <Box color="blue">
                      <Link to="/cart">עדכן:</Link>
                    </Box>
                  </Box>
                </Flex>
                {/* Stack for order summary */}
              </Center>
              <Box>
                <Box
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  bg="whitesmoke"
                  dir="rtl"
                >
                  <Text fontSize="2xl">סיכום הזמנה</Text>

                  <Flex bg="whitesmoke" justifyContent="space-evenly">
                    <Text> פריט</Text>
                    <Text>${cart.itemsPrice.toFixed(2)}</Text>
                  </Flex>
                  <hr />
                  <Flex bg="whitesmoke" justifyContent="space-evenly">
                    <Text>משלוח</Text>
                    <Text>${cart.shippingPrice.toFixed(2)}</Text>
                  </Flex>
                  <hr />
                  <Flex bg="whitesmoke" justifyContent="space-evenly">
                    <Text>מס</Text>
                    <Text>${cart.taxPrice.toFixed(2)}</Text>
                  </Flex>
                  <hr />
                  <Flex
                    bg="whitesmoke"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <Text fontSize="xl"> סכו"ם</Text>
                    <Text>${cart.totalPrice.toFixed(2)} </Text>
                  </Flex>
                  <Flex justifyContent="center">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                      bg="white"
                      as='ins'
                      color="black"
                    >
                      בצע הזמנה
                    </Button>
                  </Flex>
                </Box>
                {loading && <LoadingBox></LoadingBox>}
              </Box>
            </Box>
          );
        }}
      </Media>
    </>
  );
}

export default PlaceOrderScreen;
