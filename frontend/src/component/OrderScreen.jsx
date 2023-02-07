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
  Text,
} from "@chakra-ui/react";
import { React, useContext, useEffect, useReducer } from "react";
import LoadingBox from "../component/LoadingBox";
import { Store } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

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
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Your browser is outdated!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : (
    <Box dir="rtl">
      <Helmet>
        <title>order {orderId}</title>
      </Helmet>
      <Text as="mark" fontSize="2xl">
        מספר הזמנה: {orderId}
      </Text>

      <Card border="1px solid">
        <CardHeader>
          <Text fontSize={"xl"}> משלוח עבור:</Text>
        </CardHeader>
        <CardBody>
          <Text fontSize={"xl"}>שם: {order.shippingAddress.fullName}</Text>

          <Text fontSize={"xl"}>
            כתובת: {order.shippingAddress.address},{order.shippingAddress.city},
            {order.shippingAddress.postalCode},{order.shippingAddress.country}{" "}
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

      <Card>
        <CardHeader>Payment</CardHeader>
        <CardBody>
          <Text fontSize="xl">Method</Text>
          {order.paymentMethod}
        </CardBody>
        <CardFooter>
          {order.isPaid ? (
            <Alert>Paid at {order.paidAt}</Alert>
          ) : (
            <Alert status="error">
              <AlertIcon />
              Not Paid
            </Alert>
          )}
        </CardFooter>
      </Card>
    </Box>
  );
}

export default OrderScreen;
