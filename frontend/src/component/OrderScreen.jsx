import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Image,
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

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Your browser is outdated!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : (
    <Grid dir="rtl">
      <Helmet>
        <title>order {orderId}</title>
      </Helmet>
      <Text as="mark" fontSize="2xl">
        מספר הזמנה: {orderId}
      </Text>
      {/* Grid for address the user */}
      <GridItem gridColumn="1">
        <Card border="1px solid">
          <CardHeader>
            <Text fontSize={"xl"}> משלוח עבור:</Text>
          </CardHeader>
          <CardBody>
            <Text fontSize={"xl"}>שם: {order.shippingAddress.fullName}</Text>

            <Text fontSize={"xl"}>
              כתובת: {order.shippingAddress.address},
              {order.shippingAddress.city},{order.shippingAddress.postalCode},
              {order.shippingAddress.country}{" "}
            </Text>
          </CardBody>
          <CardFooter>
            {order.isDelivered ? (
              <Alert>Delivered at {order.delivered}</Alert>
            ) : (
              <Alert status="error">
                <AlertIcon />
                Not Delivered
              </Alert>
            )}
          </CardFooter>
        </Card>
      </GridItem>
      {/* Grid for pay */}
      <GridItem gridColumn="1">
        <Card border="1px solid">
          <CardHeader>תשלום</CardHeader>
          <CardBody>
            {/* <Text fontSize="xl">שיטת תשלום</Text> */}

            {/* <PayPalScriptProvider
                options={{ "client-id": clientId11 }}

                
              >
                <PayPalButtons />
              </PayPalScriptProvider> */}
          </CardBody>
          <CardFooter>
            {!order.isPaid && (
              <Box>
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
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem gridColumn="1">
        <Card border="1px solid">
          <CardHeader>Items</CardHeader>
          <CardBody>
            {order.orderItems.map((item) => (
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
          </CardBody>
        </Card>
      </GridItem>
      <GridItem
        gridColumn="2"
        gridRowEnd="3"
        display="flex"
        textAlign="center"
        justifyContent="center"
      >
        <GridItem
          w="60%"
          h="100%"
          border="1px solid"
          borderRadius="30%"
          boxShadow=" 4px 12px 15px -7px rgba(0,0,0,0.91)"
        >
          <Text fontSize="2xl">Order Summary</Text>

          <GridItem>
            <Text>Item</Text>
            <Text>${order.itemsPrice.toFixed(2)}</Text>
          </GridItem>
          <hr />
          <GridItem>
            <Text>Shipping</Text>
            <Text>${order.shippingPrice.toFixed(2)}</Text>
          </GridItem>
          <hr />
          <GridItem>
            <Text>Tax</Text>
            <Text>${order.taxPrice.toFixed(2)}</Text>
          </GridItem>
          <hr />
          <GridItem>
            <Text fontSize="2xl"> Order Total</Text>

            <Text>${order.totalPrice.toFixed(2)} </Text>
          </GridItem>
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default OrderScreen;
