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
    <Media query="(min-width: 900px)">
      {(matches) => {
        return matches ? (
          <Card
            boxShadow="5px 5px 8px 9px rgba(0,0,0,0.75)"
            display="flex"
            // flexWrap="wrap"
            alignContent="flex-start"
            w="15%"
            h="70%"
            border="1px solid"
            bg="radial-gradient(circle, rgba(3,3,3,1) 0%, rgba(179,161,161,0.700717787114846) 0%)"
          >
            <CardBody>
              <Grid h="105%">
                <GridItem>
                  <Link to={`/product/${product.slug}`}>
                    <Image
                      filter="contrast(90%)"
                      _hover={{ filter: "contrast(100%)" }}
                      src={product.image}
                      alt={product.name}
                      w="100%"
                      h="200px"
                    />
                  </Link>
                </GridItem>
                <GridItem>
                  <Link to={`/product/${product.slug}`}>
                    <Heading size="md">{product.name}</Heading>
                  </Link>
                </GridItem>
                <GridItem>
                  <strong>
                    <Text fontSize="2xl">{product.price}</Text>
                  </strong>
                </GridItem>
                <GridItem>
                  <Heading fontSize="100%"> Rating:</Heading>
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
                  <Heading fontSize="100%">
                    Reviews:{product.numReviews}{" "}
                  </Heading>
                </GridItem>
              </Grid>
            </CardBody>

            {product.countInStock !== "0" ? (
              <Button
                bg="silver"
                w="100%"
                borderRadius="none"
                onClick={() => addToCartHandler(product)}
              >
                <CardFooter>
                  <Text>הוסף לעגלה</Text>
                </CardFooter>
              </Button>
            ) : (
              <Button bg="red" w="100%" borderRadius="none">
                <CardFooter>
                  <Text> חסר במלאי</Text>
                </CardFooter>
              </Button>
            )}
          </Card>
        ) : (
          <Card
            boxShadow="5px 5px 8px 9px rgba(0,0,0,0.75)"
            display="flex"
            // flexWrap="wrap"
            alignContent="flex-end"
            w="40%"
            h="50%"
            border="1px solid"
            mt="3%"
            bg="radial-gradient(circle, rgba(3,3,3,1) 0%, rgba(179,161,161,0.700717787114846) 0%)"
        dir="rtl"
        
        >
            <CardBody>
              <Grid h="105%">
                <GridItem>
                  <Link to={`/product/${product.slug}`}>
                    <Image
                      filter="contrast(90%)"
                      _hover={{ filter: "contrast(100%)" }}
                      src={product.image}
                      alt={product.name}
                      w="100%"
                      h="200px"
                    />
                  </Link>
                </GridItem>
                <GridItem>
                  <Link to={`/product/${product.slug}`}>
                    <Heading size="md">{product.name}</Heading>
                  </Link>
                </GridItem>
                <GridItem>
                  <strong>
                    <Text fontSize="xl"> {product.price} ש"ח </Text>
              
                  </strong>
                </GridItem>
                <GridItem>
                  <Flex>
                   
                  <Heading fontSize="100%"> דירוג:</Heading>
                 <Box
                  display="flex"
                  alignItems="center"
                  >
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < product.rating ? "yellow" : "white"}
                          boxSize={2}
                        />
                        
                      ))}
                  </Box>
                

                  </Flex>
                  <Flex fontSize="100%">
                  ביקורות:{" "}{product.numReviews}
                  </Flex>
                </GridItem>
              </Grid>
            </CardBody>

            {product.countInStock !== "0" ? (
              <Button
                bg="silver"
                w="100%"
                borderRadius="none"
                onClick={() => addToCartHandler(product)}
              >
                <CardFooter>
                  <Text>הוסף לעגלה</Text>
                </CardFooter>
              </Button>
            ) : (
              <Button bg="red" w="100%" borderRadius="none">
                <CardFooter>
                  <Text> חסר במלאי</Text>
                </CardFooter>
              </Button>
            )}
          </Card>
        );
      }}
    </Media>
  );
}

export default Cards;
