import React from "react";
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  SmallCloseIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Media from "react-media";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isLargerThen768] = useMediaQuery('(min-width:900px)')

  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

  const UpdateCartHandler = async (item, quantity) => {
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
  const RemoovItemHendler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      {cartItems.length === 0 ? (
        <Flex
          justifyContent="center"
          direction="column"
          alignItems="center"
          dir="rtl"
          color="red"
          w="100%"
          h={isLargerThen768 ? "70vh" : "50vh" }
          fontSize="2xl"
          p={4}
        >
          <Box>העגלת קניות ריקה!</Box>
          <Box color="blue" as="ins">
            <Link to="/"> למוצרים</Link>
          </Box>
        </Flex>
      ) : (
        <Media query="(min-width: 900px)">
          {(matches) => {
            return matches ? (
              <Stack isInline gap={3} mt="4%" h="90vh">
                <Grid w="70%" h="100vh" ml="3%">
                  {cartItems.map((item) => (
                    <GridItem justifyContent="space-around" key={item._id}>
                      <Card
                        display="flex"
                        justifyContent="space-around"
                        flexDirection="row"
                        alignItems="center"
                        w="90%"
                        bg="silver"
                        boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                      >
                        <Image
                          objectFit="cover"
                          h="90px"
                          w="90px"
                          src={item.image}
                          alt="Caffe Latte"
                        />

                        {/* <Link to={`/product/${item.slug}`}>{item.name}</Link> */}

                        <Box
                          w="10%"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          key={item._id}
                        >
                          <Button
                            borderRadius="50%"
                            color="black"
                            colorScheme="white"
                            onClick={() =>
                              UpdateCartHandler(item, item.quantity + 1)
                            }
                            disabled={item.quantity === item.countInStock}
                          >
                            +
                          </Button>{" "}
                          <Text>{item.quantity}</Text>{" "}
                          <Button
                            color="black"
                            colorScheme="white"
                            borderRadius="50%"
                            onClick={() =>
                              UpdateCartHandler(item, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            -
                          </Button>
                        </Box>

                        <Box>{item.price} ₪</Box>

                        <DeleteIcon
                          color="red.500"
                          onClick={() => RemoovItemHendler(item)}
                        />
                      </Card>
                    </GridItem>
                  ))}
                </Grid>
                <hr />
                <Card bg="silver" w="30%" h="160px" display="flex">
                  <CardBody>
                    <h3 dir="rtl">
                      כמות מוצרים {" - "}{" "}
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                      <hr />
                      ש"ח :{" "}
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </h3>
                    <hr />
                  </CardBody>
                  <CardFooter>
                    <Button
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                      bg="orange.300"
                    >
                      Process to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </Stack>
            ) : (
              <Flex bg="white">
                <Grid w="100%" h="100vh">
                  {cartItems.map((item) => (
                    <GridItem key={item._id}>
                      <Card
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="row"
                        alignItems="center"
                        w="100%"
                        bg="whitesmoke"
                        boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                        h="80%"
                        border="1px solid"
                        mt="1%"
                      >
                        <Box h="100%">
                          <SmallCloseIcon
                            flex="start"
                            color="red.500"
                            boxSize={7}
                            onClick={() => RemoovItemHendler(item)}
                          />
                          <Box display="flex" flex="end" h="50%" fontSize="xl">
                            <Box
                              w="20%"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              key={item._id}
                            >
                              <Button
                                fontSize="xl"
                                color="black"
                                colorScheme="white"
                                onClick={() =>
                                  UpdateCartHandler(item, item.quantity + 1)
                                }
                                disabled={item.quantity === item.countInStock}
                              >
                                <TriangleUpIcon boxSize={3} />
                              </Button>{" "}
                              <Text>{item.quantity}</Text>{" "}
                              <Button
                                color="black"
                                colorScheme="white"
                                fontSize="xl"
                                onClick={() =>
                                  UpdateCartHandler(item, item.quantity - 1)
                                }
                                disabled={item.quantity === 1}
                              >
                                <TriangleDownIcon boxSize={3} />
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                        <Flex flexDirection="column-reverse" dir="rtl">
                          <Box>{item.description}</Box>
                          {/* <Link to={`/product/${item.slug}`}> */}
                          {/* סוג:{item.name} */}
                          {/* </Link> */}

                          <Box>מחיר:{item.price} </Box>
                        </Flex>

                        <Image
                          objectFit="cover"
                          h="100%"
                          w="20%"
                          src={item.image}
                          alt="Caffe Latte"
                        />
                      </Card>
                    </GridItem>
                  ))}
                  <Card bg="whitesmoke" w="100%" h="65%" display="flex">
                    <CardBody>
                      <Box fontSize="2xl" dir="rtl">
                        כמות מוצרים {" - "}{" "}
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}
                        <hr />
                        ש"ח :{" "}
                        {cartItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        )}
                      </Box>
                      <hr />
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={checkoutHandler}
                        disabled={cartItems.length === 0}
                        bg="silver"
                      >
                        לקופה
                      </Button>
                    </CardFooter>
                  </Card>
                </Grid>
                {/* <hr /> */}
              </Flex>
            );
          }}
        </Media>
      )}
    </>
  );
}

export default CartScreen;
