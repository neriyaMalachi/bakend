import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Button,
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { StarIcon } from "@chakra-ui/icons";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./stayle/stayle.css";
function Cards(props) {
  const { product } = props;
  const toast = useToast();
  const [heart, setHeart] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const id = state.userInfo._id;
  const {
    cart: { cartItems },
  } = state;
  useEffect(() => {
    checkIfAFaivoritExists(product._id, id);
  });
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/propertis/${item._id}`);
    if (data.countInStock < quantity) {
      toast({
        title: "!בעיה ",
        description: "אזל מהמלאי",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const addToFaivoritList = async (item) => {
    try {
      axios.post(`http://localhost:5000/api/users/addFaivoritItem/${id}`, {
        item,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteFaivorit = async (item) => {
    const requestBody = {
      userId: id,
      productId: item,
    };
    await fetch(`http://localhost:5000/api/users/deleteFaivourite`, {
      body: JSON.stringify(requestBody),
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {});
    });
  };
  const checkIfAFaivoritExists = async (item) => {
    const requestBody = {
      userId: id,
      productId: item,
    };
    const response = axios.post(
      "http://localhost:5000/api/users/checkIfAFaivoritExists",
      requestBody
    );
    if ((await response).data === false) {
      setHeart(false);
    } else {
      setHeart(true);
    }
  };
  return (
    <Card
      my={5}
      mx={2}
      shadow={"dark-lg"}
      display="flex"
      alignContent="flex-start"
      w="100%"
      maxW={"350px"}
      bg="#393E46"
      color="white"
    >
      <CardBody className="container" p={0} dir="rtl">
        <Grid>
          <GridItem>
            <Link to={`/product/${product.slug}`}>
              <Image
                _hover={{ filter: "contrast(100%)" }}
                objectFit="fill"
                src={product.image}
                alt={product.name}
                w="100%"
                maxH="350px"
                borderRadius="5%"
              />
            </Link>
            <Box className="overlay">
              <Button
                bg="none"
                onClick={() => {
                  if (heart === false) {
                    setHeart(true);
                    addToFaivoritList(product);
                  } else {
                    setHeart(false);
                    deleteFaivorit(product._id, id);
                  }
                }}
              >
                {!heart ? (
                  <AiOutlineHeart size={25} color="red" />
                ) : (
                  <FaHeart  size={25} color="red"/>
                )}
              </Button>
            </Box>
          </GridItem>
          <GridItem py={3} pr={2} lineHeight="40px">
            <Link to={`/product/${product.slug}`}>
              <Heading size="md">{product.name}</Heading>
            </Link>
            <Text fontSize="2xl"> ₪{product.price}</Text>
            <Box>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < product.rating ? "yellow" : "white"}
                  />
                ))}
            </Box>
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
        <CardFooter
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h="40px"
          _hover={"none"}
          bg="red"
          w="100%"
          borderRadius="10"
        >
          <Text> חסר במלאי</Text>
        </CardFooter>
      )}
    </Card>
  );
}

export default Cards;
