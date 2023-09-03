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
      // toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);
console.log(cart.paymentMethod);
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
              bg="#393E46"
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
                  <Text mr={"3%"}>כתובת הזמנה</Text>

                  <GridItem mr={"3%"}>
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
                    <Flex
                      w="40%"
                      direction={"column"}
                      justifyContent="space-between"
                    >
                      <Text fontSize="xl">כתובת: {cart.shippingAddress.address}</Text>

                      <Text fontSize="xl">עיר:{cart.shippingAddress.city}</Text>


                      <Text fontSize="xl">מיקוד:{cart.shippingAddress.postalCode}</Text>


                      <Text fontSize="xl">מדינה: {cart.shippingAddress.country}</Text>


                    </Flex>
                  </GridItem>
                  <Box mr={"3%"} color="blue.600">
                    <Link to="/shipping"> <Button bg="#00ADB5" color="#EEEEEE">עדכן </Button></Link>
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

                  <Box mr={"3%"}>
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
                  <Box mr={"3%"} color="blue">
                    <Link to="/payment"> <Button bg="#00ADB5" color="#EEEEEE">עדכן </Button></Link>
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
                    <Link to="/cart"> <Button bg="#00ADB5" color="#EEEEEE">עדכן </Button></Link>
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
                    bg="#00ADB5"
                    color="#EEEEEE"
                  >
                    ביצוע הזמנה
                  </Button>
                </VStack>
                {loading && <LoadingBox></LoadingBox>}
              </Grid>
            </Grid>
          ) : (
            <VStack
              dir="rtl"
              h="140vh"
              bg="#393E46"
              gap={4}
            >
              {/* VStack for address */}
              <Stack
                mt="3%"
                w="90%"
                borderRadius={20}
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                bg="#222831"
                color="#EEEEEE"
              >
                <Text textAlign={"center"}>כתובת הזמנה</Text>

                <GridItem >

                  <Flex
                    h="200px"
                    direction="column"
                    justifyContent="space-evenly"
                  >
                    <Text fontSize="xl">שם:{cart.shippingAddress.fullName}</Text>
                    <Text fontSize="xl">כתובת: {cart.shippingAddress.address}</Text>
                    <Text fontSize="xl">עיר: {cart.shippingAddress.city}</Text>
                    <Text fontSize="xl">מיקוד: {cart.shippingAddress.postalCode}</Text>
                    <Text fontSize="xl">מדינה:{cart.shippingAddress.country}</Text>
                  </Flex>
                </GridItem>
                <Flex justifyContent={"center"} color="blue">
                  <Link to="/shipping"><Button bg="#00ADB5" color="#EEEEEE">עדכן </Button></Link>
                </Flex>
              </Stack>

              {/* VStack for Method */}
              <Stack
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
                w="90%"
                bg="#222831"
                color="#EEEEEE"
                borderRadius={20}
              >
                <Text textAlign={"center"} >שיטת תשלום</Text>
                <Box >
                  <Box
                    w="20%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text fontSize="xl"> תשלום:</Text>
                    {"    "}
                    {cart.paymentMethod}
                  </Box>
                </Box>
                <Flex justifyContent={"center"}>
                  <Link to="/payment"><Button bg="#00ADB5" color="#EEEEEE">עדכן </Button></Link>
                </Flex>
              </Stack>

              {/* Stack for items */}
              <VStack
                dir="rtl"
                w="90%"
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
                    <HStack
                      key={item._id}
                      display="flex"
                      gap={12}
                      border=" 1px solid"
                      borderRadius={20}
                      color="#EEEEEE"
                      dir="rtl"
                    >
                      <Image
                        w="60px"
                        h="60px"
                        src={item.image}
                        alt={item.name}
                        objectFit="contain"
                      />


                      <Link to={`/product/${item.slug}`}>{item.name}שם:</Link>
                      <Text>₪{item.price}</Text>
                    </HStack>
                  ))}
                </Stack>


                <Box mr="3%" color="blue">
                  <Link to="/cart"><Button bg="#00ADB5" color="#EEEEEE">עדכן </Button></Link>
                </Box>
              </VStack>



              {/* Stack for order summary */}

              <Stack
                w="90%"
                bg="#222831"
                color="#EEEEEE"
                borderRadius="20"
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"

              >
                <Text textAlign={"center"} fontSize="2xl">סיכום הזמנה</Text>
                <Text fontSize={"2xl"}>מוצר {" "}₪{cart.itemsPrice.toFixed(2)}</Text>
                <Text fontSize="2xl">משלוח {" "}₪{cart.shippingPrice.toFixed(2)}</Text>
                <Text fontSize="2xl">מע"מ {" "} ₪{cart.taxPrice.toFixed(2)}</Text>
                <Text fontSize="2xl"> סיכום הזמנה {" "} ₪{cart.totalPrice.toFixed(2)}</Text>
                
                <Flex justifyContent={"center"} >
                <Button
                  w="30%"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                  bg="#00ADB5"
                  color="#EEEEEE"
                >
                  ביצוע הזמנה
                </Button>
                </Flex>
              </Stack>
              {loading && <LoadingBox></LoadingBox>}
            </VStack>
          );
        }}
      </Media>
    </>
  );
}

export default PlaceOrderScreen;
