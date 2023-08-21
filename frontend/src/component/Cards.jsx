import React, { useContext } from "react";
import {
  Image,
  Button,
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { StarIcon } from "@chakra-ui/icons";
import Media from "react-media";

function Cards(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/propertis/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
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
                  <strong>
                    <Text fontSize="2xl"> ₪{product.price}</Text>
                  </strong>
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
              _hover={"none"}
                bg="#00ADB5"
                w="100%"
                onClick={() => addToCartHandler(product)}
              >
                <CardFooter>
                  <Text>הוסף לעגלה</Text>
                </CardFooter>
              </Button>
            ) : (
                <CardFooter display={"flex"} alignItems={"center"}  justifyContent={"center"} h="40px" _hover={"none"} bg="red" w="100%" borderRadius="10">
                  <Text> חסר במלאי</Text>
                </CardFooter>
            )}
          </Card>
      
    
  );
}

export default Cards;
