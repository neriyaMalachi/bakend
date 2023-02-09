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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "./LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FATCH_REQUEST":
      return { ...state, loading: true };
    case "FATCH_success":
      return { ...state, orders: action.payload, loading: false };
    case "FATCH_FAIL":
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

  useContext(() => {
    const fatchData = async () => {
      dispatch({ type: "FATCH_REQUEST" });
      try {
        const { data } = await axios.get(`api/orders/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FATCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FATCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fatchData();
  }, [userInfo]);
 console.log(orders)

  return (
    <>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th isNumeric>ACTIONS</Th>
              </Tr>
            </Thead>

            {orders.map((order) => (
              <Tbody>
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.createdAt.substring(0, 10)}</Td>
                  <Td>{order.totalPrice.toFixed(2)}</Td>
                  <Td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</Td>
                  <Td isNumeric>
                    {order.isDeliverd
                      ? order.deliveredAt.substring(0, 10)
                      : "NO"}
                  </Td>
                  <Td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default OrderHistoryScreen;
