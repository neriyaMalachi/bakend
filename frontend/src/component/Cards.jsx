import React, { useContext, useState } from "react";
import {
  Image,
  Button,
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  Flex,
  useToast,
  position,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { StarIcon } from "@chakra-ui/icons";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

function Cards(props) {
  const { product } = props;
  const toast = useToast();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [heart, setHeart] = useState(false);
  // const [faivorit, setFaivorit] = useState();
  const user = state.userInfo._id;
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
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
  const addToFaivoritList = async (item) => {
    // console.log(item,user);
    axios.post(`http://localhost:3000/api/users/addFaivoritItem:${user}`, { item })
      .then((error) => {
        console.log(error.message)
      }).catch(() =>
        console.log("success"),
      )
  }
  const deleteFaivorit = async (item) => {
    await fetch(`http://localhost:3000/api/favorite/deleteFaivorit/${item}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
  }

  //  const Editproduact = async (item) => {
  //   console.log(item);
  //   let result = await fetch(
  //     `http://localhost:3000/api/favorite/update/${item}`,
  //     {
  //       method: "put",
  //       body: JSON.stringify({
  //       faivorit,
  //       }),
  //       // headers: {
  //       //   "Content-Type": "Application/json",
  //       // },
  //     }
  //   );
  //   result = await result.json();
  // };

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
              if (heart === false) {
                setHeart(true)
                addToFaivoritList(product,user)

              }
              else {
                setHeart(false)
                deleteFaivorit(product._id);
              }
            }
            }>

              {!heart ? (

                <AiOutlineHeart size={25} color="red" />
              ) : (

                <AiTwotoneHeart size={25} color="red" />
              )}
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


  );
}

export default Cards;
