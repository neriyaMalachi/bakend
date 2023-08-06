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
            m="1%"
            boxShadow="5px 5px 8px 9px rgba(0,0,0,0.75)"
            display="flex"
            alignContent="flex-start"
            w="200px"
            border="1px solid"
            bg="radial-gradient(circle, rgba(3,3,3,1) 0%, rgba(179,161,161,0.700717787114846) 0%)"
          >
            <CardBody p={0} dir="rtl">
              <Grid>
                <GridItem>
                  {/* <Link to={`/product/${product.slug}`}> */}
                  <Image
                    filter="contrast(90%)"
                    _hover={{ filter: "contrast(100%)" }}
                    objectFit="fill"
                    src={product.image}
                    alt={product.name}
                    w="100%"
                    h="250px"
                    borderRadius="5%"
                  />
                  {/* </Link> */}
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
                {/* <GridItem>
                
                </GridItem> */}
                {/* <GridItem> */}
                {/* <Flex direction="row" bg="red" w="100%" > */}
                {/* <Heading fontSize="100%"> המלצות: */}

                {/* </Heading> */}
                {/* </Flex> */}
                {/* <Heading fontSize="100%">
                    Reviews:{product.numReviews}{" "}
                  </Heading> */}
                {/* </GridItem> */}
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
            w="200px"
            alignContent="flex-end"
            border="1px solid"
            mt="3%"
            bg="radial-gradient(circle, rgba(3,3,3,1) 0%, rgba(179,161,161,0.700717787114846) 0%)"
            dir="rtl"
            m="1%"
          >
            <CardBody p={0}>
              <Grid h="105%">
                <GridItem>
                  {/* <Link to={`/product/${product.slug}`}> */}
                  <Image
                    filter="contrast(90%)"
                    _hover={{ filter: "contrast(100%)" }}
                    objectFit="fill"
                    src={product.image}
                    alt={product.name}
                    w="100%"
                    h="250px"
                    borderRadius="5%"
                  />
                  {/* </Link> */}
                </GridItem>

                <GridItem pt={1} pb={5} pr={2} lineHeight="40px">
                  {/* <Link to={`/product/${product.slug}`}> */}
                  <Heading size="md">{product.name}</Heading>
                  {/* </Link> */}
                  <strong>
                    <Text fontSize="xl"> {product.price} ש"ח </Text>
                  </strong>
                  <Box display="flex" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < product.rating ? "yellow" : "white"}
                          boxSize={4}
                        />
                      ))}
                  </Box>
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
