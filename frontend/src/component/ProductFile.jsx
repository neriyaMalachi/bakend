import {
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Card,
  Button,
  Text,
  SimpleGrid,
  CardHeader,
  Box,
} from "@chakra-ui/react";
import {StarIcon} from '@chakra-ui/icons'
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, propertis: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductFile() {
  const params = useParams();
  const { slug } = params;
const navigat=useNavigate();
  const [{ loading, error, propertis }, dispatch] = useReducer(reducer, {
    propertis: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/propertis/slug/${slug}`);
        console.log(result);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
 

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === propertis._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/propertis/${propertis._id}`,1);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...propertis , quantity},
    });
    navigat('/cart')
  };
  

  return loading ? (
    <Center>Loading...</Center>
  ) : error ? (
    <Center>{error}</Center>
  ) : (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "200%", sm: "400px" }}
          src={propertis.image}
          alt="Caffe Latte"
          w="50%"
          p="12%"
        />
        <Helmet>
          <title>{propertis.name}</title>
        </Helmet>
        <SimpleGrid
          spacing={200}
          display="flex"
          w="80%"
          h="100%"
          justifyContent="space-between"
        >
          <Card w="80%" textAlign="end" color="red">
            <CardHeader>
              <Heading size="md"> {propertis.name} </Heading>
            </CardHeader>
            <CardBody>
              <hr color="silver" />
              <Box> {propertis.rating} :המלצות 
           
              <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < propertis.rating ? 'yellow.100' : 'white'}
              />
            ))}
        
        </Box>
              
              
              
              
              
              
              </Box>
              <hr color="silver" />
              <Text> {propertis.price} :מחיר </Text>
              <hr color="silver" />
              <Text> :תיאור </Text>
            </CardBody>
            <CardFooter p="3%">
              <Text>{propertis.description}</Text>
            </CardFooter>
          </Card>

          <Card
            w="60%"
            h="100%"
            textAlign="end"
            border="silver 1px solid"
            p="3%"
          >
            <CardHeader>
              <Heading size="md"> {propertis.price} :מחיר </Heading>
              <hr color="silver" />
            </CardHeader>
            <CardBody>
              {propertis.countInStock > 0 ? (
                <Text>
                  <Button bg="green" border="none">
                    קיים במלאי{" "}
                  </Button>{" "}
                  :מצב מוצר{" "}
                </Text>
              ) : (
                <Text>
                  <Button bg="red" border="none">
                    {propertis.rating}אזל מהמלאי{" "}
                  </Button>{" "}
                  :מצב מוצר{" "}
                </Text>
              )}
              <hr color="silver" />
            </CardBody>
            {propertis.countInStock > 0 ? (
              <CardFooter>
                <Button
                  w="100%"
                  h="150%"
                  variant="solid"
                  bg="silver"
                  borderRadius="25%"
                  onClick={addToCartHandler}
                >
                  הוסף להגלה
                </Button>
              </CardFooter>
            ) : (
              <Text>איו אפשרות להוסיף להגלה</Text>
            )}
          </Card>
        </SimpleGrid>
      </Card>
    </>
  );
}

export default ProductFile;
