import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
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
              gap={30}
              templateRows="repeat12, 1fr)"
              templateColumns="repeat(2, 1fr)"
              h="91vh"
              bg="#00ADB5"
            >
              <Grid mt="2%" gap={12}>
                {/* Grid for address */}
                <Grid
                  dir="rtl"
                  borderRadius={20}
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  w="100%"
                  rowSpan={2}
                  colSpan={1}
                  bg="#222831"
                  color="#EEEEEE"
                >
                  <Text   mr={"3%"}>כתובת הזמנה</Text>

                  <GridItem  mr={"3%"}> 
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
                  <Box  mr={"3%"} color="blue">
                    <Link to="/shipping">שינוי:</Link>
                  </Box>
                </Grid>

                {/* Grid for Method */}
                <Grid
                  dir="rtl"
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  w="100%"
                  bg="#222831"
                  color="#EEEEEE"
                  borderRadius={20}
                  
                >
                  <Text mr={"3%"} >שיטת תשלום</Text>

                  <Box  mr={"3%"}>
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
                  <Box  mr={"3%"} color="blue">
                    <Link to="/payment">שינוי:</Link>
                  </Box>
                </Grid>

                {/* Stack for items */}
                <Grid
                  dir="rtl"
                  w="100%"
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                  bg="#222831"
                  color="#EEEEEE"
                  borderRadius={20}
                >
                  <Text mr="3%">פריטים</Text>
                  
                  <Stack
                    overflowY={"scroll"}
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#4E3636",
                        borderRadius: "24px",
                      },
                    }}
                    mt="3%"
                    w="100%"
                    h="25vh"
                    ml="7%"
                  >
                    {cart.cartItems.map((item) => (
                      <Grid key={item._id}>
                        <GridItem
                          display="flex"
                          w="100%"
                          h="100%"
                          justifyContent="space-around"
                          alignItems="center"
                          border=" 1px solid"
                          borderRadius={20}
                          color="#EEEEEE"
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

                          <GridItem color="#00ADB5">
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
                  </Stack>


                  <Box mr="3%" color="blue">
                  <Link to="/cart">שינוי:</Link>
                  </Box>
                </Grid>
              </Grid>
              {/* Stack for order summary */}

              <Grid display="flex" textAlign="center" justifyContent="center">
                <VStack
                  w="60%"
                  h="55%"
                  mt="2%"
                  bg="#222831"
                  color="#EEEEEE"
                  borderRadius="30"
                  boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                 
                >
                  <Text fontSize="2xl">סיכום הזמנה</Text>

                  <GridItem>
                    <Text>מוצר</Text>
                    <Text>₪{cart.itemsPrice.toFixed(2)}</Text>
                  </GridItem>

                  <GridItem>
                    <Text>משלוח</Text>
                    <Text>₪{cart.shippingPrice.toFixed(2)}</Text>
                  </GridItem>
                  <hr />
                  <GridItem>
                    <Text>מע"מ</Text>
                    <Text>₪{cart.taxPrice.toFixed(2)}</Text>
                  </GridItem>
                  <hr />
                  <GridItem>
                    <Text fontSize="2xl"> סיכום הזמנה</Text>

                    <Text>₪{cart.totalPrice.toFixed(2)} </Text>
                  </GridItem>

                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                    bg="silver"
                    color="black"
                  >
                    ביצוע הזמנה
                  </Button>
                </VStack>
                {loading && <LoadingBox></LoadingBox>}
              </Grid>
            </Grid>
          ) : (
            <Grid
            dir="rtl"
            gap={30}
            templateRows="repeat12, 1fr)"
            templateColumns="repeat(2, 1fr)"
            h="91vh"
            bg="#00ADB5"
          >
            <Grid mt="2%" gap={12}>
              {/* Grid for address */}
              <Grid
                dir="rtl"
                borderRadius={20}
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                w="100%"
                rowSpan={2}
                colSpan={1}
                bg="#222831"
                color="#EEEEEE"
              >
                <Text   mr={"3%"}>כתובת הזמנה</Text>

                <GridItem  mr={"3%"}> 
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
                <Box  mr={"3%"} color="blue">
                  <Link to="/shipping">שינוי:</Link>
                </Box>
              </Grid>

              {/* Grid for Method */}
              <Grid
                dir="rtl"
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                w="100%"
                bg="#222831"
                color="#EEEEEE"
                borderRadius={20}
                
              >
                <Text mr={"3%"} >שיטת תשלום</Text>

                <Box  mr={"3%"}>
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
                <Box  mr={"3%"} color="blue">
                  <Link to="/payment">שינוי:</Link>
                </Box>
              </Grid>

              {/* Stack for items */}
              <Grid
                dir="rtl"
                w="100%"
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                bg="#222831"
                color="#EEEEEE"
                borderRadius={20}
              >
                <Text mr="3%">פריטים</Text>
                
                <Stack
                  overflowY={"scroll"}
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#4E3636",
                      borderRadius: "24px",
                    },
                  }}
                  mt="3%"
                  w="100%"
                  h="25vh"
                  ml="7%"
                >
                  {cart.cartItems.map((item) => (
                    <Grid key={item._id}>
                      <GridItem
                        display="flex"
                        w="100%"
                        h="100%"
                        justifyContent="space-around"
                        alignItems="center"
                        border=" 1px solid"
                        borderRadius={20}
                        color="#EEEEEE"
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

                        <GridItem color="#00ADB5">
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
                </Stack>


                <Box mr="3%" color="blue">
                <Link to="/cart">שינוי:</Link>
                </Box>
              </Grid>
            </Grid>
            {/* Stack for order summary */}

            <Grid display="flex" textAlign="center" justifyContent="center">
              <VStack
                w="60%"
                h="55%"
                mt="2%"
                bg="#222831"
                color="#EEEEEE"
                borderRadius="30"
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
               
              >
                <Text fontSize="2xl">סיכום הזמנה</Text>

                <GridItem>
                  <Text>מוצר</Text>
                  <Text>₪{cart.itemsPrice.toFixed(2)}</Text>
                </GridItem>

                <GridItem>
                  <Text>משלוח</Text>
                  <Text>₪{cart.shippingPrice.toFixed(2)}</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text>מע"מ</Text>
                  <Text>₪{cart.taxPrice.toFixed(2)}</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text fontSize="2xl"> סיכום הזמנה</Text>

                  <Text>₪{cart.totalPrice.toFixed(2)} </Text>
                </GridItem>

                <Button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                  bg="silver"
                  color="black"
                >
                  ביצוע הזמנה
                </Button>
              </VStack>
              {loading && <LoadingBox></LoadingBox>}
            </Grid>
          </Grid>
          );
        }}
      </Media>
    </>
  );
}

export default PlaceOrderScreen;
