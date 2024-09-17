import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Button,
  Heading,
  Text,
  Box,
  useToast,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { StarIcon } from "@chakra-ui/icons";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./stayle/stayle.css";

function Cards({ product }) {
  const toast = useToast();
  const [heart, setHeart] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems }, userInfo: { _id: userId } } = state;

  useEffect(() => {
    checkIfFavoriteExists(product._id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product._id]);

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find(x => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/propertis/${item._id}`);

    if (data.countInStock < quantity) {
      return toast({
        title: "בעיה",
        description: "אזל מהמלאי",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const toggleFavorite = async (item) => {
    setHeart(prev => !prev);
    heart ? deleteFavorite(item._id) : addToFavoriteList(item);
  };

  const addToFavoriteList = async (item) => {
    try {
      await axios.post(`/api/users/addFavoriteItem/${userId}`, { item });
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteFavorite = async (itemId) => {
    try {
      await axios.delete(`/api/users/deleteFavorite`, {
        data: { userId, productId: itemId },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkIfFavoriteExists = async (itemId) => {
    try {
      const { data } = await axios.post(
        `/api/users/checkIfFavoriteExists`,
        { userId, productId: itemId }
      );
      setHeart(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Card
      my={5}
      mx={2}
      shadow="lg"
      borderRadius="15px"
      bgGradient="linear(to-br, #2b2d42, #393e46)"
      color="white"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)", shadow: "2xl" }}
      w="100%"
      maxW="350px"
    >
      <CardBody p={0}>
        <Flex direction="column" justifyContent="space-between" h="100%">
          <Box position="relative">
            <Link to={`/product/${product.slug}`}>
              <Image
                objectFit="cover"
                src={product.image}
                alt={product.name}
                w="100%"
                maxH="300px"
                borderTopRadius="15px"
                filter="grayscale(30%)"
                _hover={{ filter: "grayscale(0)" }}
              />
            </Link>
            <IconButton
              icon={heart ? <FaHeart color="red" size={25} /> : <AiOutlineHeart color="red" size={25} />}
              variant="ghost"
              position="absolute"
              top="10px"
              right="10px"
              onClick={() => toggleFavorite(product)}
            />
          </Box>
          <Box p={4} textAlign="center">
            <Link to={`/product/${product.slug}`}>
              <Heading size="md" mb={2}>{product.name}</Heading>
            </Link>
            <Text fontSize="2xl" color="#00adb5">₪{product.price}</Text>
            <Flex justifyContent="center" mt={2}>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon key={i} color={i < product.rating ? "yellow" : "gray"} />
                ))}
            </Flex>
          </Box>
        </Flex>
      </CardBody>
      {product.countInStock > 0 ? (
        <Button
          bg="#00ADB5"
          borderBottomRadius="15px"
          w="100%"
          onClick={() => addToCartHandler(product)}
          _hover={{ bg: "#00a3b0" }}
          _active={{ bg: "#00858b" }}
        >
          <CardFooter>
            <Text>הוסף לעגלה</Text>
          </CardFooter>
        </Button>
      ) : (
        <CardFooter
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="40px"
          bg="red"
          borderBottomRadius="15px"
          w="100%"
        >
          <Text>חסר במלאי</Text>
        </CardFooter>
      )}
    </Card>
  );
}

export default Cards;
