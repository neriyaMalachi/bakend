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
  Flex,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import Media from "react-media";

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
  const navigat = useNavigate();
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
    const { data } = await axios.get(`/api/propertis/${propertis._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...propertis, quantity },
    });
    navigat("/cart");
  };

  return loading ? (
    <Center>Loading...</Center>
  ) : error ? (
    <Center>{error}</Center>
  ) : (
    <>
      <Helmet>
        <title>{propertis.name}</title>
      </Helmet>

      <Media query="(min-width: 900px)">
        {(matches) => {
          return matches ? (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              display="flex"
              justifyContent="center"
              h="91vh"
            >
              <Box display="flex" alignItems="center" bg="wh">
                <Image
                  src={propertis.image}
                  alt="Caffe Latte"
                  filter="contrast(60%)"
                  _hover={{ filter: "contrast(100%)" }}
                  p="12%"
                  h="55%"
                  w="80%"
                />
              </Box>
              <SimpleGrid
                spacing={200}
                display="flex"
                w="80%"
                h="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Card w="60%" textAlign="end" bg="silver" color="black">
                  <CardHeader>
                    <Heading size="md"> {propertis.name} </Heading>
                  </CardHeader>
                  <CardBody>
                    <hr color="silver" />
                    <Box>
                      {" "}
                      {propertis.rating} :המלצות
                      <Box display="flex" mt="2" alignItems="center">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              color={i < propertis.rating ? "yellow" : "white"}
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
                  alignSelf="start"
                  textAlign="end"
                  border="silver 1px solid"
                  p="3%"
                  bg="silver"
                >
                  <CardHeader>
                    <Heading size="md"> {propertis.price} :מחיר </Heading>
                    <hr color="black" />
                  </CardHeader>
                  <CardBody>
                    {propertis.countInStock > 0 ? (
                      <Text>
                        <Button bg="green.400" border="none">
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
                        variant="solid"
                        bg="yellow"
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
          ) : (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              display="flex"
              justifyContent="center"
              h="91vh"
            >
              <Box w="50vh" h="100vh">
                <Image
                  src={propertis.image}
                  alt="Caffe Latte"
                  //  filter="contrast(60%)"
                  _hover={{ filter: "contrast(100%)" }}
                  h="50vh"
                  w="100vh"
                />
              </Box>
              <Flex
                // spacing={200}
                display="flex"
                w="100%"
                h="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Card
                  w="100vh"
                  h="40vh"
                  textAlign="end"
                  bg="silver"
                  color="black"
                  borderRadius="none"
                >
                  <CardHeader>
                    <Flex justifyContent="space-around">
                      <Heading size="md"> {propertis.price} :מחיר </Heading>
                      <Heading size="md"> {propertis.name} </Heading>
                    </Flex>
                    <hr color="black" />
                  </CardHeader>
                  <CardBody>
                    {propertis.countInStock > 0 ? (
                      <Flex justifyContent={"end"}>
                        <Text w="25%" bg="green.400" border="none">
                          קיים במלאי
                        </Text>
                        :מצב מוצר{" "}
                      </Flex>
                    ) : (
                      <Text>
                        <Button bg="red" border="none">
                          {propertis.rating}אזל מהמלאי{" "}
                        </Button>{" "}
                        :מצב מוצר{" "}
                      </Text>
                    )}

                    <hr color="silver" />
                    <Box dir="rtl">
                      <Flex alignItems="center">
                        המלצות:{" "}
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon
                              boxSize={3}
                              key={i}
                              color={i < propertis.rating ? "yellow" : "white"}
                            />
                          ))}
                      </Flex>
                      <hr color="silver" />
                      <Flex>
                        <Text>מחיר : {propertis.price} </Text>
                      </Flex>
                      <hr color="silver" />

                      <Flex>תיאור :{propertis.description}</Flex>
                    </Box>
                  </CardBody>
                  <CardFooter>
                    {propertis.countInStock > 0 ? (
                      <CardFooter>
                        <Button
                          variant="solid"
                          bg="yellow"
                          onClick={addToCartHandler}
                        >
                          הוסף להגלה
                        </Button>
                      </CardFooter>
                    ) : (
                      <Text>איו אפשרות להוסיף להגלה</Text>
                    )}
                  </CardFooter>
                </Card>
              </Flex>
            </Card>
          );
        }}
      </Media>
    </>
  );
}

export default ProductFile;
