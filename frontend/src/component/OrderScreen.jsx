import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { React, useContext, useEffect, useReducer } from "react";
import LoadingBox from "../component/LoadingBox";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    <Grid dir="rtl">
      <Helmet>
        <title>order {orderId}</title>
      </Helmet>
      <Text as="mark" fontSize="2xl">
        מספר הזמנה: {orderId}
      </Text>
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
          {/* <CardFooter>
            {order.isDelivered ? (
              <Alert>Delivered at {order.delivered}</Alert>
            ) : (
              <Alert status="error">
                <AlertIcon />
                Not Delivered
              </Alert>
            )}
          </CardFooter> */}
        </Card>
      </GridItem>
      <GridItem gridColumn="1">
        <Card border="1px solid">
          <CardHeader>תשלום</CardHeader>
          <CardBody>
            <Text fontSize="xl">שיטת תשלום</Text>
            {order.paymentMethod}
            <Text  bg="red.200" w="51%" > קיימת בעיה בתשלום להזמנה התקשרו לטל'-0585202271 </Text>
            <Text  bg="red.200" w="51%" > או השאירו הודעה בטל'-0585202271 </Text>

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
        {loading && <LoadingBox></LoadingBox>}
      </GridItem>
    </Grid>
  );
}

export default OrderScreen;
