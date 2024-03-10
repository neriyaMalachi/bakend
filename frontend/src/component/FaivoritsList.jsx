import { Box, Button, Card, CardBody, CardFooter, Flex, Grid, GridItem, Heading, Image, Link, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Store } from "../Store";
import { StarIcon } from '@chakra-ui/icons';
import { AiTwotoneHeart } from 'react-icons/ai';
import axios from 'axios';

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
function FaivoritsList() {
  const [{  propertis }, dispatch] = useReducer(reducer, {
    propertis: [],
    loading: true,
    error: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [data, setData] = useState();
  const {
    cart: { cartItems },
  } = state;
  const user = state.userInfo._id;
  const [heart, setHeart] = useState(false);
  const toast = useToast();
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/getAllListFaivoritProps/${user}`)
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === propertis._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/propertis/${item._id}`);
    if (data.countInStock < quantity) {
      toast({
        title: '!בעיה ',
        description: 'אזל מהמלאי',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const deleteFaivorit = async (item) => {
    const requestBody = {
      userId: user,
      productId: item,
    }
    await fetch(`http://localhost:5000/api/users/deleteFaivourite`, {
      body: JSON.stringify(requestBody),
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((result) => {
        result.json().then((resp) => {
          fetchData();
        });
      })
  }
  return (
    <Box  bg="#393E46">
    <Text textAlign={"center"} fontSize={"xx-large"}>מועדפים</Text>
    <Box
      display="flex"
     
      flexWrap="wrap"
      justifyContent="space-evenly"
      minH={"75vh"}
    >
      {data &&

        data.map((product, index) => (
          <Card
            my={5}
            mx={2}
            shadow={"dark-lg"}
            display="flex"
            w="50%"
            maxW={"350px"}
            bg="#393E46"
            color="white"
            key={index}
          >
            <CardBody p={0} dir="rtl">
              <Grid>
                <GridItem>
                  <Link to={`/product/${product.slug}`}>
                    <Image
                      filter="contrast(90%)"
                      _hover={{ filter: "contrast(100%)" }}
                      objectFit="fill"
                      src={product.image}
                      alt={product.name}
                      w="100%"
                      maxH="350px"
                      borderRadius="5%"
                    />
                  </Link>
                </GridItem>
                <GridItem py={3} pr={2} lineHeight="40px">
                  <Link to={`/product/${product.slug}`}>
                    <Heading size="md">{product.name}</Heading>
                  </Link>
                  <Text fontSize="2xl"> ₪{product.price}</Text>
                  <Box >
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < product.rating ? "yellow" : "white"}
                        />
                      ))}
                  </Box>
                  <Text bg="none" onClick={() => {
                   
                    setHeart(false)
                    deleteFaivorit(product._id, user);
                  }
                  }>

               
                  <AiTwotoneHeart size={25} color="red" /> 

                  </Text>
                </GridItem>
              </Grid>
            </CardBody>

            {product.countInStock !== "0" ? (
              <Button
                id="button"
                bg="#00ADB5"
                w="100%"
              onClick={() => addToCartHandler(product)}
              >
                <CardFooter>
                  <Text>הוסף לעגלה</Text>
                </CardFooter>
              </Button>
            ) : (
              <CardFooter display={"flex"} alignItems={"center"} justifyContent={"center"} h="40px" _hover={"none"} bg="red" w="100%" borderRadius="10">
                <Text> חסר במלאי</Text>
              </CardFooter>
            )}
          </Card>

        ))

      }
    </Box>
    </Box>
  )
}

export default FaivoritsList