import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useContext, useReducer, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import LoadingBox from "../component/LoadingBox";
import { getError } from "../utils";
import Media from "react-media";

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
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
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
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      console.error(getError(err));
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
        <title>סיכום הזמנה</title>
      </Helmet>
      <Media query="(min-width: 990px)">
        {(matches) => (
          matches ? (
            <Grid
              dir="rtl"
              gap={30}
              templateColumns="repeat(2, 1fr)"
              h="100vh"
              bg="#393E46"
              p={5}
            >
              {/* Address Grid */}
              <Box
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                overflowY="scroll"
              >
                <Text fontSize="2xl" mb={4}>כתובת הזמנה</Text>
                <Flex direction="column" mb={4}>
                  <Text fontSize="xl">שם: {cart.shippingAddress.fullName}</Text>
                  <Text fontSize="xl">כתובת: {cart.shippingAddress.address}</Text>
                  <Text fontSize="xl">עיר: {cart.shippingAddress.city}</Text>
                  <Text fontSize="xl">מיקוד: {cart.shippingAddress.postalCode}</Text>
                  <Text fontSize="xl">מדינה: {cart.shippingAddress.country}</Text>
                </Flex>
                <Link to="/shipping">
                  <Button bg="#00ADB5" color="#EEEEEE">עדכן</Button>
                </Link>
              </Box>

              {/* Payment Method Grid */}
              <Box
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                overflowY="scroll"
              >
                <Text fontSize="2xl" mb={4}>שיטת תשלום</Text>
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="xl">תשלום ב- {cart.paymentMethod}</Text>
                </Flex>
                <Link to="/payment">
                  <Button bg="#00ADB5" color="#EEEEEE">עדכן</Button>
                </Link>
              </Box>

              {/* Items Stack */}
              <Box
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                overflowY="scroll"
              >
                <Text fontSize="2xl" mb={4}>פריטים</Text>
                {cart.cartItems.map((item) => (
                  <HStack
                    key={item._id}
                    spacing={4}
                    border="1px solid"
                    borderRadius="md"
                    p={3}
                    mb={3}
                    bg="#333"
                  >
                    <Image
                      w="60px"
                      h="60px"
                      src={item.image}
                      alt={item.name}
                      objectFit="contain"
                    />
                    <Link to={`/product/${item.slug}`} style={{ color: "#00ADB5" }}>
                      {item.name}
                    </Link>
                    <Text>כמות: {item.quantity}</Text>
                  </HStack>
                ))}
                <Link to="/cart">
                  <Button bg="#00ADB5" color="#EEEEEE">עדכן</Button>
                </Link>
              </Box>

              {/* Order Summary Stack */}
              <VStack
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                spacing={4}
                align="start"
              >
                <Text fontSize="2xl" mb={4}>סיכום הזמנה</Text>
                <Text>מוצר ₪{cart.itemsPrice.toFixed(2)}</Text>
                <Text>משלוח ₪{cart.shippingPrice.toFixed(2)}</Text>
                <Text>מע"מ ₪{cart.taxPrice.toFixed(2)}</Text>
                <Text fontSize="xl" fontWeight="bold">סיכום הזמנה ₪{cart.totalPrice.toFixed(2)}</Text>
                <Button
                  onClick={placeOrderHandler}
                  isDisabled={cart.cartItems.length === 0}
                  bg="#00ADB5"
                  color="#EEEEEE"
                >
                  ביצוע הזמנה
                </Button>
                {loading && <LoadingBox />}
              </VStack>
            </Grid>
          ) : (
            <VStack dir="rtl" bg="#393E46" p={5} spacing={5}>
              {/* Address Stack */}
              <Stack
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                w="full"
                overflowY="scroll"
              >
                <Text fontSize="2xl" mb={4}>כתובת הזמנה</Text>
                <Flex direction="column" mb={4}>
                  <Text fontSize="xl">שם: {cart.shippingAddress.fullName}</Text>
                  <Text fontSize="xl">כתובת: {cart.shippingAddress.address}</Text>
                  <Text fontSize="xl">עיר: {cart.shippingAddress.city}</Text>
                  <Text fontSize="xl">מיקוד: {cart.shippingAddress.postalCode}</Text>
                  <Text fontSize="xl">מדינה: {cart.shippingAddress.country}</Text>
                </Flex>
                <Link to="/shipping">
                  <Button bg="#00ADB5" color="#EEEEEE">עדכן</Button>
                </Link>
              </Stack>

              {/* Payment Method Stack */}
              <Stack
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                w="full"
                overflowY="scroll"
              >
                <Text fontSize="2xl" mb={4}>שיטת תשלום</Text>
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="xl">תשלום ב- {cart.paymentMethod}</Text>
                </Flex>
                <Link to="/payment">
                  <Button bg="#00ADB5" color="#EEEEEE">עדכן</Button>
                </Link>
              </Stack>

              {/* Items Stack */}
              <Stack
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                w="full"
                overflowY="scroll"
              >
                <Text fontSize="2xl" mb={4}>פריטים</Text>
                {cart.cartItems.map((item) => (
                  <HStack
                    key={item._id}
                    spacing={4}
                    border="1px solid"
                    borderRadius="md"
                    p={3}
                    mb={3}
                    bg="#333"
                  >
                    <Image
                      w="60px"
                      h="60px"
                      src={item.image}
                      alt={item.name}
                      objectFit="contain"
                    />
                    <Link to={`/product/${item.slug}`} style={{ color: "#00ADB5" }}>
                      {item.name}
                    </Link>
                    <Text>כמות: {item.quantity}</Text>
                  </HStack>
                ))}
                <Link to="/cart">
                  <Button bg="#00ADB5" color="#EEEEEE">עדכן</Button>
                </Link>
              </Stack>

              {/* Order Summary Stack */}
              <Stack
                borderRadius="lg"
                boxShadow="lg"
                bg="#222831"
                color="#EEEEEE"
                p={5}
                w="full"
                spacing={4}
                align="start"
              >
                <Text fontSize="2xl" mb={4}>סיכום הזמנה</Text>
                <Text>מוצר ₪{cart.itemsPrice.toFixed(2)}</Text>
                <Text>משלוח ₪{cart.shippingPrice.toFixed(2)}</Text>
                <Text>מע"מ ₪{cart.taxPrice.toFixed(2)}</Text>
                <Text fontSize="xl" fontWeight="bold">סיכום הזמנה ₪{cart.totalPrice.toFixed(2)}</Text>
                <Button
                  onClick={placeOrderHandler}
                  isDisabled={cart.cartItems.length === 0}
                  bg="#00ADB5"
                  color="#EEEEEE"
                >
                  ביצוע הזמנה
                </Button>
                {loading && <LoadingBox />}
              </Stack>
            </VStack>
          )
        )}
      </Media>
    </>
  );
}

export default PlaceOrderScreen;
