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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import Media from "react-media";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "./LoadingBox";
import { HashLoader } from "react-spinners";

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
        <Grid>
        <GridItem bg="#393E46" h={"90vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
          <HashLoader color="#00ADB5" />
        </GridItem>
      </Grid>
      ) : error ? (
        <Flex h={"90vh"}>

        <Alert status="error" justifyContent={"center"}>
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        </Flex>
      ): 
      
              <Box bg="#393E46" color="#EEEEEE"  minH="70vh">
                <TableContainer >
                  <Table>
                    <Thead>
                      <Tr  >
                        <Th color="#EEEEEE">מספר הזמנה</Th>
                        <Th color="#EEEEEE">סה"כ</Th>
                        <Th color="#EEEEEE">שולם</Th>
                        <Th color="#EEEEEE">נשלח</Th>
                        <Th color="#EEEEEE" >פעולות</Th>
                      </Tr>
                    </Thead>

                    {orders.map((order) => (
                      <Tbody key={order._id}>
                        <Tr key={order._id}>
                          <Td>{order._id}</Td>
                          <Td>{order.totalPrice.toFixed(2)}</Td>
                          <Td>{order.isPaid ? "כן" : "לא"}</Td>
                          <Td >
                            {order.isDeliverd
                              ? order.deliveredAt.substring(10)
                              : "לא"}
                          </Td>
                          <Td>
                            <Button
                              type="button"
                              color={"#00ADB5"}
                              bg="#222831"
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
                            }
    </>
  );
}

export default OrderHistoryScreen;
