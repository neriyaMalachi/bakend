import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { React, useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import Media from "react-media";
import { HashLoader } from "react-spinners";
import { FaWhatsapp } from "react-icons/fa";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    default:
      return state;
  }
}

function OrderScreen() {
  const [couponCode, setCouponCode] = useState("");
  const [validCoupon, setValidCoupon] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const [alerterror, setAlertErrorrror] = useState(false);
  const toast = useToast();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order, successPay }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
    }
  );

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast({
          title: "ההזמנה בוצעה.",
          description: "נשמח לראותכם שוב .",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        setAlertErrorrror(true);
      }
    });
  }
  function onError(err) {
    setAlertErrorrror(true);
  }
  // פונקציה לבדיקת קופון
  const applyCoupon = async () => {
    if (!couponCode) {
      toast({
        title: "שגיאה",
        description: "בבקשה הקלד קוד קופון",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // בדיקת הקופון מהשרת
    const response = await fetch(`/api/coupons/validate/${couponCode}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data.isValid) {
      setValidCoupon(data);
      const total = order.itemsPrice - order.itemsPrice / data.discount;
      setTotalPrice(total);
      toast({
        title: "קופון פעיל",
        description: `הנחה של ${data.discount}% הופעלה בהצלחה!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "שגיאה",
        description: "קוד קופון שגוי או פג תוקף.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token} ` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "ILS",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

  return loading ? (
    <Grid>
      <GridItem
        bg="#393E46"
        h={"90vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <HashLoader color="#00ADB5" />
      </GridItem>
    </Grid>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Your browser is outdated!</AlertTitle>
      <AlertDescription>
        {alerterror}
        {error}
      </AlertDescription>
    </Alert>
  ) : (
    <Media query="(min-width: 900px)">
      {(matches) => {
        return matches ? (
          <Grid
            bg="#393E46"
            color="#EEEEEE"
            dir="rtl"
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(1, auto)"
            gap="4"
            p="4"
          >
            <Helmet>
              <title>Order {orderId}</title>
            </Helmet>

            {/* Order ID */}
            <GridItem gridColumn="1 / span 2" mb="4">
              <Text bg="#00ADB5" p="4" fontSize="2xl" borderRadius="md">
                מספר הזמנה: {orderId}
              </Text>
            </GridItem>

            {/* Shipping Address */}
            <GridItem>
              <Card bg="#222831" color="#EEEEEE" borderRadius="lg">
                <CardHeader>
                  <Text fontSize="xl" fontWeight="bold">
                    משלוח עבור:
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text fontSize="lg">
                    שם: {order.shippingAddress.fullName}
                  </Text>
                  <Text fontSize="lg">
                    כתובת: {order.shippingAddress.address}
                  </Text>
                  <Text fontSize="lg">עיר: {order.shippingAddress.city}</Text>
                  <Text fontSize="lg">
                    מיקוד: {order.shippingAddress.postalCode}
                  </Text>
                  <Text fontSize="lg">
                    מדינה: {order.shippingAddress.country}
                  </Text>
                </CardBody>
                <CardFooter>
                  {order.isDelivered ? (
                    <Alert status="success" borderRadius="md">
                      נשלח {order.delivered}
                    </Alert>
                  ) : (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      לא נשלח
                    </Alert>
                  )}
                </CardFooter>
              </Card>
            </GridItem>

            {/* Payment */}
            <GridItem>
              <Card bg="#222831" color="#EEEEEE" borderRadius="lg" h="100%">
                <CardHeader fontSize="xl" fontWeight="bold">
                  תשלום
                </CardHeader>
                <CardBody>
                  {order.isPaid ? (
                    <Alert status="success" borderRadius="md">
                      <AlertIcon />
                      שולם {order.paidAt}
                    </Alert>
                  ) : (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      לא שולם
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </GridItem>

            {/* Order Items */}
            <GridItem gridColumn="1 / span 2" mt="4">
              <Card bg="#222831" color="#EEEEEE" borderRadius="lg">
                <CardHeader fontSize="xl" fontWeight="bold">
                  מוצרים
                </CardHeader>
                <CardBody>
                  <Stack
                    overflowY="scroll"
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "5px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#00ADB5",
                        borderRadius: "24px",
                      },
                    }}
                    spacing="4"
                    p="4"
                    h="40vh"
                  >
                    {order.orderItems.map((item) => (
                      <HStack
                        key={item._id}
                        bg="#393E46"
                        p="3"
                        borderRadius="md"
                        boxShadow="sm"
                        spacing="4"
                      >
                        <Image
                          boxSize="90px"
                          objectFit="cover"
                          src={item.image}
                          alt={item.name}
                          borderRadius="md"
                        />
                        <Link to={`/product/${item.slug}`} fontSize="lg">
                          {item.name}
                        </Link>
                        <Flex fontSize="lg">{item.price} ₪</Flex>
                      </HStack>
                    ))}
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>

            {/* Order Summary */}
            <GridItem
              gridColumn="2"
              gridRow="2 / span 3"
              bg="#222831"
              color="#EEEEEE"
              p="4"
              borderRadius="lg"
            >
              <Text fontSize="2xl" mb="4">
                סיכום הזמנה
              </Text>
              <Stack spacing="2">
                <Text>מוצרים: ₪{order.itemsPrice.toFixed(2)}</Text>
                <Flex mb={5} direction={"column"}>
                  <Input
                    placeholder="הכנס קוד קופון"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    color="white"
                  />
                  <Button ml={2} colorScheme="green" onClick={applyCoupon}>
                    הפעל קופון
                  </Button>
                </Flex>

                <Text fontSize="2xl" fontWeight="bold">
                  סכום כולל: ₪ {totalPrice.toFixed(2)}
                </Text>
              </Stack>

              {order.paymentMethod === "payPal" && !order.isPaid ? (
                <Flex justifyContent="center" alignItems="center" mt="4">
                  {isPending ? (
                    <HashLoader color="#00ADB5" />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </Flex>
              ) : order.paymentMethod === "bit" ? (
                <>
                  <Divider my="4" />
                  <Text>קיימת בעיה בתשלום בביט</Text>
                  <VStack textAlign="center" mt="4">
                    <Text>אנה צרו קשר</Text>
                    <a href="https://api.whatsapp.com/send?phone=972585202271&text=שלום%20אשמח%20אם%20תוכלו%20ליצור%20איתני%20קשר%20בהקדם%20האפשרי">
                      <FaWhatsapp size={25} />
                    </a>
                  </VStack>
                </>
              ) : (
                <>
                  <Divider my="4" />
                  <Text>קיימת בעיה בתשלום כרגע</Text>
                  <VStack textAlign="center" mt="4">
                    <Text>אנה צרו קשר</Text>
                    <a href="https://api.whatsapp.com/send?phone=972585202271&text=שלום%20אשמח%20אם%20תוכלו%20ליצור%20איתני%20קשר%20בהקדם%20האפשרי">
                      <FaWhatsapp size={25} />
                    </a>
                  </VStack>
                </>
              )}
              <Box mb={5}>
                {validCoupon && (
                  <>
                    <Divider my={3} />
                    <Text color="green.400">
                      קופון "{validCoupon.code}" הופעל! הנחה של{" "}
                      {validCoupon.discount}%.
                    </Text>
                  </>
                )}
              </Box>
            </GridItem>
          </Grid>
        ) : (
          <Flex flexDirection="column" bg="#393E46" dir="rtl" p="4">
            <Helmet>
              <title>Order {orderId}</title>
            </Helmet>
            <Flex mb="4" color="#EEEEEE" bg="#00ADB5" p="4" borderRadius="md">
              <Text fontSize="xl">מספר הזמנה: {orderId}</Text>
            </Flex>

            {/* Shipping Address */}
            <Box mb="4">
              <Card bg="#222831" color="#EEEEEE" borderRadius="lg">
                <CardHeader>
                  <Text fontSize="l" fontWeight="bold">
                    משלוח עבור:
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text fontSize="l">שם: {order.shippingAddress.fullName}</Text>
                  <Text fontSize="l">
                    כתובת: {order.shippingAddress.address}
                  </Text>
                  <Text fontSize="l">עיר: {order.shippingAddress.city}</Text>
                  <Text fontSize="l">
                    מיקוד: {order.shippingAddress.postalCode}
                  </Text>
                  <Text fontSize="l">
                    מדינה: {order.shippingAddress.country}
                  </Text>
                </CardBody>
                <CardFooter>
                  {order.isDelivered ? (
                    <Alert borderRadius="md">נשלח {order.delivered}</Alert>
                  ) : (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      לא נשלח
                    </Alert>
                  )}
                </CardFooter>
              </Card>
            </Box>

            {/* Payment */}
            <Box mb="4">
              <Card bg="#222831" color="#EEEEEE" borderRadius="lg">
                <CardHeader>תשלום:</CardHeader>
                <CardBody>
                  {order.isPaid ? (
                    <Alert status="success" borderRadius="md">
                      <AlertIcon />
                      שולם {order.paidAt}
                    </Alert>
                  ) : (
                    <Alert status="error" borderRadius="md">
                      <AlertIcon />
                      לא שולם
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </Box>

            {/* Order Items */}
            <Box mb="4">
              <Card bg="#222831" color="#EEEEEE" borderRadius="lg">
                <CardHeader>פרטים :</CardHeader>
                <CardBody>
                  {order.orderItems.map((item) => (
                    <Flex
                      key={item._id}
                      bg="#393E46"
                      p="3"
                      borderRadius="md"
                      mb="2"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Image
                        boxSize="60px"
                        objectFit="cover"
                        src={item.image}
                        alt={item.name}
                        borderRadius="md"
                      />
                      <Link
                        to={`/product/${item.slug}`}
                        fontSize="md"
                        flex="1"
                        mx="2"
                      >
                        {item.name}
                      </Link>
                      <Text fontSize="md">{item.price} ₪</Text>
                    </Flex>
                  ))}
                </CardBody>
              </Card>
            </Box>

            {/* Order Summary */}
            <Box bg="#222831" color="#EEEEEE" p="4" borderRadius="lg">
              <Text fontSize="xl" mb="4">
                סיכום הזמנה
              </Text>
              <Stack spacing="2">
                <Text>מוצרים: ₪{order.itemsPrice.toFixed(2)}</Text>
                <Text>משלוח: ₪{order.shippingPrice.toFixed(2)}</Text>
                <Text>מע"מ: ₪{order.taxPrice.toFixed(2)}</Text>
                <Text fontSize="xl" fontWeight="bold">
                  סכום כולל: ₪{order.totalPrice.toFixed(2)}
                </Text>
              </Stack>
              {order.paymentMethod === "payPal" && !order.isPaid ? (
                <Flex justifyContent="center" alignItems="center" mt="4">
                  {isPending ? (
                    <HashLoader color="#00ADB5" />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  )}
                </Flex>
              ) : order.paymentMethod === "bit" ? (
                <>
                  <Divider my="4" />
                  <Text>קיימת בעיה בתשלום בביט</Text>
                  <VStack textAlign="center" mt="4">
                    <Text>אנה צרו קשר</Text>
                    <a href="https://api.whatsapp.com/send?phone=972585202271&text=שלום%20אשמח%20אם%20תוכלו%20ליצור%20איתני%20קשר%20בהקדם%20האפשרי">
                      <FaWhatsapp size={25} />
                    </a>
                  </VStack>
                </>
              ) : (
                <>
                  <Divider my="4" />
                  <Text>קיימת בעיה בתשלום כרגע</Text>
                  <VStack textAlign="center" mt="4">
                    <Text>אנה צרו קשר</Text>
                    <a href="https://api.whatsapp.com/send?phone=972585202271&text=שלום%20אשמח%20אם%20תוכלו%20ליצור%20איתני%20קשר%20בהקדם%20האפשרי">
                      <FaWhatsapp size={25} />
                    </a>
                  </VStack>
                </>
              )}
            </Box>
          </Flex>
        );
      }}
    </Media>
  );
}

export default OrderScreen;
