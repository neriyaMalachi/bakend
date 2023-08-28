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
  HStack,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import Media from "react-media";
import { HashLoader } from "react-spinners";

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
    // navigat("/cart");
  };
  return loading ? (
    <Grid>
      <GridItem bg="#393E46" h={"90vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
        <HashLoader color="#00ADB5" />
      </GridItem>
    </Grid>
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
            <HStack
              gap={24}
              h="100vh"
              bg="#393E46"
            >
              <Box ml="3%" bg="wh">
                <Image
                  src={propertis.image}
                  alt="nargila image"
                  // filter="contrast(60%)"
                  // _hover={{ filter: "contrast(100%)" }}
                  h="70vh"
                  w="30vw"
                />
              </Box>


              <VStack>
                <Card h="70vh" w="40vw" textAlign="end" bg="#222831" color="#EEEEEE">
                  <CardHeader>
                    <Heading size="2xl"> {propertis.name} </Heading>
                  </CardHeader>
                  <CardBody >
                    <Flex direction={"column"}  >
                      <HStack mt="3%" dir="rtl" >
                        <Heading size="md"> המלצות:</Heading>

                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              color={i < propertis.rating ? "yellow" : "white"}
                            />
                          ))}
                      </HStack>

                      <Heading mt="3%" size="md"> {propertis.price} :מחיר </Heading>
                      <Box mt="3%">
                        <Flex dir="rtl">
                        <Heading size="md"> תיאור :</Heading>

                        <Text>{propertis.description}</Text>
                      </Flex>
                        {propertis.countInStock > 0 ? (
                          <Box mt="3" >
                            <Heading size="md" color="green.400" >
                              קיים במלאי
                            </Heading>
                            <Center mt="20">
                            <Button
                              m={"3%"}
                              variant="solid"
                              bg="#00ADB5"
                              onClick={addToCartHandler}
                              w="30%"
                            >
                              הוסף להגלה
                            </Button>
                            </Center>
                          </Box>
                        ) : (
                          <Heading size="md" color="red" >
                            אזל במלאי
                          </Heading>
                        )}
                      </Box>
                      
                    </Flex>


                  </CardBody>

                </Card>
              </VStack>
            </HStack>
          ) : (
            <Card
              h="100vh"
              mt="3%"
            >
              <Image
                src={propertis.image}
                alt="Caffe Latte"
                _hover={{ filter: "contrast(100%)" }}
                w="100%"
                h="50%"
              />
              <Card dir="rtl">
                <CardHeader>
                  <Heading size="xl"> {propertis.name} </Heading>
                </CardHeader>
                <CardBody >
                  <Heading size="md"> מחיר : {propertis.price} ₪</Heading>
                  <Box mt="2" dir="rtl">

                    {propertis.countInStock > 0 ? (
                      <Flex >
                        <Heading size={"md"} > מצב מוצר{" "}: {" "}</Heading>
                        <Heading size={"md"} w="30%" color="green.400" >
                          קיים במלאי
                        </Heading>
                      </Flex>
                    ) : (
                      <Flex >

                        <Heading size={"md"} > מצב מוצר{" "}: {" "}</Heading>
                        <Heading size={"md"} w="35%" color="red" >
                          אזל מהמלאי
                        </Heading>
                      </Flex>
                    )}

                    <Flex mt="2" alignItems="center">
                      <Heading size="md" >
                        המלצות:{" "}
                      </Heading>
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


                    <Flex mt="2"><strong> תיאור :</strong>{propertis.description}</Flex>
                  </Box>
                </CardBody>
                <CardFooter>
                  {propertis.countInStock > 0 ? (
                    <CardFooter>
                      <Button
                        variant="solid"
                        bg="#00ADB5"
                        onClick={addToCartHandler}
                      >
                        הוסף להגלה
                      </Button>
                    </CardFooter>
                  ) : (
                    <Text color="red">איו אפשרות להוסיף להגלה</Text>
                  )}
                </CardFooter>
              </Card>
            </Card>
          );
        }}
      </Media>
    </>
  );
}

export default ProductFile;
