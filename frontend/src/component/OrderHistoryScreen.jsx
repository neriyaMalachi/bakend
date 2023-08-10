import {
  Alert,
  AlertDescription,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  Text,
  Card,
  CardHeader,
  CardFooter,
  Flex,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import Media from "react-media";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "./LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);


  return (
    <>
      <Helmet>
        <title>היסטורית הזמנות</title>
      </Helmet>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ):orders ?(
        <VStack bg="#393E46" color="#00ADB5" h="75vh"  >
          <Text fontSize="3xl" color="#EEEEEE" >אין הזמנות בהסטוריה  </Text>
          <Link  to={"/"}>בחזרה לטפרית</Link>
        </VStack>
      ) : (
        <Media query="(min-width: 990px)">
          {(matches) => {
            return matches ? (

              <Box>
                <TableContainer bg="white">
                  <Text textAlign="center" fontSize="2xl">
                    היסטוריית הזמנות
                  </Text>
                  <Table variant="simple">
                    <TableCaption>
                      Imperial to metric conversion factors
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>מספר הזמנה</Th>
                        <Th>תאריך</Th>
                        <Th>סה"כ</Th>
                        <Th>שולם</Th>
                        <Th>נשלח</Th>
                        <Th isNumeric>פעולות</Th>
                      </Tr>
                    </Thead>

                    {orders.map((order) => (
                      <Tbody key={order._id}>
                        <Tr key={order._id}>
                          <Td>{order._id}</Td>
                          <Td>{order.createdAt.substring(10)}</Td>
                          <Td>{order.totalPrice.toFixed(2)}</Td>
                          <Td>{order.isPaid ? order.paidAt : "לא"}</Td>
                          <Td isNumeric>
                            {order.isDeliverd
                              ? order.deliveredAt.substring(10)
                              : "לא"}
                          </Td>
                          <Td>
                            <Button
                              type="button"
                              variant="light"
                              onClick={() => {
                                navigate(`/order/${order._id}`);
                              }}
                            >
                              פרטים
                            </Button>
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Box  bg="white" dir="rtl" >
                  <Text textAlign="center" fontSize="2xl">
                    היסטוריית הזמנות
                  </Text>
                {/* <TableContainer bg="white">
                  <Text textAlign="center" fontSize="2xl">
                    היסטוריית הזמנות
                  </Text>
                  <Table variant="simple">
                    <TableCaption>
                      Imperial to metric conversion factors
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>מספר הזמנה</Th>
                        <Th>תאריך</Th>
                        <Th>סה"כ</Th>
                        <Th>שולם</Th>
                        <Th>נשלח</Th>
                        <Th isNumeric>פעולות</Th>
                      </Tr>
                    </Thead> */}

                    {orders.map((order) => (
                    
                      <Box key={order._id} >
                        <Card>
                          <CardHeader>
                            
                            <Text>מספר הזמנה :{" "}{order._id}</Text>
                            <Text>תאריך:{" "}{order.createdAt.substring(10)}</Text>
                            <Text>סה"כ:{" "}{order.totalPrice.toFixed(2)}</Text>
                            <Text>שולם:{" "}{order.isPaid ? order.paidAt : "לא"}</Text>
                            <Text>
                            נשלח
                            :{" "}
                            {order.isDeliverd
                              ? order.deliveredAt.substring(10) : "לא"}
                            </Text>
                          </CardHeader>
                          <CardFooter>
                          <Button
                              type="button"
                              variant="light"
                              onClick={() => {
                                navigate(`/order/${order._id}`);
                              }}
                              bg="green.200"
                            >
                              פרטים
                            </Button>
                          </CardFooter>
                        </Card>
                      </Box>
                    ))}
                  {/* </Table>
                </TableContainer> */}
              </Box>
            );
          }}
        </Media>
      )}
    </>
  );
}

export default OrderHistoryScreen;
