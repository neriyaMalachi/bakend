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
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { React, useContext, useEffect, useReducer } from "react";
import LoadingBox from "../component/LoadingBox";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Media from "react-media";
import { HashLoader } from "react-spinners";

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
  //  const clientId11 = "AZKL-OCyN36PITH8tkDGcX0aznF66Hgui7spphjCtXcs3opUgVSd6mzFW-xAnR9MG-NCVMIm5BoYMZG_"

  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
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
        toast.success("Order is paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

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
console.log(order);
  return loading ? (
    <Grid>
      <GridItem bg="#393E46" h={"90vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
        <HashLoader color="#00ADB5" />
      </GridItem>
    </Grid>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Your browser is outdated!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : (
    <Media query="(min-width:900px)">
      {(matches) => {
        return matches ? (
          <Grid
            bg="#393E46"
            color="#EEEEEE"
            dir="rtl"
            templateColumns="repeat(2,1fr)"
            templateRows="repeat(1)"
          >
            <Helmet>
              <title>order {orderId}</title>
            </Helmet>
            <GridItem m="3%" gridColumn="1" gridRow="1">
              <Text bg="#00ADB5" fontSize="2xl">
                מספר הזמנה: {orderId}
              </Text>
            </GridItem>
            {/* Grid for address the user */}
            <GridItem m="3%" gridColumn="1" gridRow="2">
              <Card bg="#222831" color="#EEEEEE" >
                <CardHeader>
                  <Text fontSize={"xl"}> משלוח עבור:</Text>
                </CardHeader>
                <CardBody>
                  <Text fontSize={"xl"}>
                    שם: {order.shippingAddress.fullName}
                  </Text>
                  <Text fontSize={"xl"}>
                    כתובת: {order.shippingAddress.address},
                  </Text>
                  <Text fontSize={"xl"}>
                    עיר: {order.shippingAddress.city},
                  </Text>
                  <Text fontSize={"xl"}>
                    מיקוד: {order.shippingAddress.postalCode},
                  </Text>
                  <Text fontSize={"xl"}>
                    מדינה:  {order.shippingAddress.country}{" "}
                  </Text>


                </CardBody>
                <CardFooter>
                  {order.isDelivered ? (
                    <Alert bg="green.200">נשלח {order.delivered}</Alert>
                  ) : (
                    <Alert bg="red.300" status="error">
                      <AlertIcon />
                      לא נשלח
                    </Alert>
                  )}
                </CardFooter>
              </Card>
            </GridItem>
            {/* Grid for pay */}
            <GridItem m="3%" bg="#222831" color="#EEEEEE" gridColumn="1" gridRow="3">
              <Card bg="#222831" >
                <CardHeader color="#EEEEEE">תשלום</CardHeader>

                <CardBody color="#EEEEEE">
                  {order.isPaid ? (
                    <Alert status="success">
                      <AlertIcon />
                      Paid at {order.paidAt}
                    </Alert>
                  ) : (
                    <Alert bg="red.300" status="error">
                      <AlertIcon />
                      לא שולם
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </GridItem>
            {/* Grid for Item */}
            <GridItem m="3%" gridColumn="1" gridRow="4">
              <Card bg="#222831" >
                <CardHeader color="#EEEEEE">מוצרים</CardHeader>
                <CardBody>
                  <Stack
                    overflowY={"scroll"}
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "5px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#222831",
                        borderRadius: "24px",
                      },
                    }}
                    mt="3%"
                    w="100%"
                    h="40vh"
                    ml="7%"
                  >
                    {order.orderItems.map((item) => (
                      <Stack  >
                        <HStack
                          key={item._id}
                          justifyContent={"space-around"}
                          alignItems="center"

                          color="#EEEEEE"
                          bg="#393E46"
                          boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                          borderRadius={10}
                        >
                          <Image
                            objectFit="cover"
                            h="90px"
                            w="90px"
                            src={item.image}
                            alt="Caffe Latte"
                          />
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                          <Flex>{item.price} ₪</Flex>
                        </HStack>
                      </Stack>
                    ))}
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            {/* Grid for order */}
            <GridItem
              gridColumn="2"
              gridRow="2  "
              display="flex"
              textAlign="center"
              justifyContent="center"
            >
              <GridItem
                w="60%"
                h="100%"
                bg="#222831"
                borderRadius="10%"
                boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
              >
                <Text fontSize="2xl">סיכום הזמנה</Text>

                <GridItem>
                  <Text>מוצרים</Text>
                  <Text>₪{order.itemsPrice.toFixed(2)}</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text>משלוח</Text>
                  <Text>{order.shippingPrice.toFixed(2)} ₪</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text>מע"מ</Text>
                  <Text>₪{order.taxPrice.toFixed(2)}</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text fontSize="2xl"> סכו"ם</Text>

                  <Text>{order.totalPrice.toFixed(2)} ₪</Text>

                  {/* <Flex justifyContent="center" alignItems="center">
                    {!order.isPaid && (
                      <Box justifyItems="center" alignItems="start" w="50%">
                        {isPending ? (
                          <LoadingBox />
                        ) : (
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                      </Box>
                    )}
                  </Flex> */}
                </GridItem>
              </GridItem>
            </GridItem>
          </Grid>
        ) : (
          <Flex
            flexDirection="column"
            bg="#393E46"
            dir="rtl"
            templateColumns="repeat(2,1fr)"
            templateRows="repeat(1)"
          >
            <Helmet>
              <title>order {orderId}</title>
            </Helmet>
            <Flex m="3%" bg="#00ADB5">
              <Text fontSize="xl">מספר הזמנה: {orderId}</Text>
            </Flex>
            {/* Grid for address the user */}
            <Box>
              <Card m="3%" bg="#222831" color="#EEEEEE" >
                <CardHeader>
                  <Text fontSize={"l"}> משלוח עבור:</Text>

                  <Text fontSize={"l"}>
                    שם: {order.shippingAddress.fullName}
                  </Text>

                  <Text fontSize={"l"}>
                    שם: {order.shippingAddress.fullName}
                  </Text>
                  <Text fontSize={"l"}>
                    כתובת: {order.shippingAddress.address},
                  </Text>
                  <Text >
                    עיר: {order.shippingAddress.city},
                  </Text>
                  <Text fontSize={"l"}>
                    מיקוד: {order.shippingAddress.postalCode},
                  </Text>
                  <Text fontSize={"l"}>
                    מדינה:  {order.shippingAddress.country}{" "}
                  </Text>
                </CardHeader>
                <CardFooter>
                  {order.isDelivered ? (
                    <Alert>נשלח {order.delivered}</Alert>
                  ) : (
                    <Alert bg="red.300" status="error">
                      <AlertIcon />
                      לא נשלח
                    </Alert>
                  )}
                </CardFooter>
              </Card>
            </Box>
            {/* Grid for pay */}
            <GridItem gridColumn="1" gridRow="3">
              <Card m="3%" bg="#222831" color="#EEEEEE" >
                <CardHeader>תשלום:</CardHeader>

                <CardBody>
                  {order.isPaid ? (
                    <Alert status="success">
                      <AlertIcon />
                      שולם {order.paidAt}
                    </Alert>
                  ) : (
                    <Alert bg="red.300" status="error">
                      <AlertIcon />
                      לא שולם
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </GridItem>
            {/* Grid for Item */}
            <GridItem>
              <Card bg="#222831" color="#EEEEEE" m="3%">
                <CardHeader>פרטים :</CardHeader>
                <CardBody>
                  {order.orderItems.map((item) => (
                    <Flex
                      flexDirection="column"
                      justifyContent="space-around"
                      key={item._id}

                    >
                      <GridItem
                        display="flex"
                        w="100%"
                        h="100%"
                        m="1%"
                        justifyContent="space-around"
                        alignItems="center"
                        bg="#393E46"
                        borderRadius={10}
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
                    </Flex>
                  ))}
                </CardBody>
              </Card>
            </GridItem>
            {/* Grid for order */}
            <Box bg="#222831" m="3%" borderRadius={10} color="#EEEEEE" display="flex" textAlign="center" justifyContent="center">
              <GridItem w="100%" h="100%" >
                <Text fontSize="2xl">סיכום הזמנה</Text>

                <GridItem>
                  <Text>מוצרים</Text>
                  <Text>{order.itemsPrice.toFixed(2)} ₪</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text>משלוח</Text>
                  <Text>{order.shippingPrice.toFixed(2)} ₪</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text>מע"מ</Text>
                  <Text>{order.taxPrice.toFixed(2)} ₪</Text>
                </GridItem>
                <hr />
                <GridItem>
                  <Text fontSize="2xl"> מחיר </Text>

                  <Text>{order.totalPrice.toFixed(2)} ₪</Text>

                  <Flex mt="3%" justifyContent="center" alignItems="center">
                    {!order.isPaid && (
                      <Box justifyItems="center" alignItems="start" w="40%">
                        {isPending ? (
                          <LoadingBox />
                        ) : (
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                      </Box>
                    )}
                  </Flex>
                </GridItem>
              </GridItem>
            </Box>
          </Flex>
        );
      }}
    </Media>
  );
}

export default OrderScreen;
