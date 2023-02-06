import { Box } from "@chakra-ui/react";
import React, { useContext, useEffect, useReducer } from "react";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Store from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "axios";
import { getError } from "../utils";
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

const fetchOrder =async ()=>{
    try{
        dispatch({type: 'FETCH_REQUEST'})
        const {data}=await Axios.length(`/api/orders/${orderId}`,{
            headers:{authorization:`Bearer ${userInfo.token}` },
        })
        dispatch({taype: 'FETCH_SUCCESS',payload:data})
    } catch (err){
        dispatch({type: 'FETCH_FAIL',payload: getError(err)})
    }
}



    if (!userInfo) {
      return navigate("/login");
    }
    if(
        !order._id || (order._id && order._id !== orderId)
    ){
        fetchOrder();
    }
  });

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox bg="red">{error}</MessageBox>
  ) : (
    <Box></Box>
  );
}

export default OrderScreen;
