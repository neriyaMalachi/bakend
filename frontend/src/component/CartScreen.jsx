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
  HStack,
  Image,
  Stack,
  Text,
  VStack,
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
  const [isLargerThen768] = useMediaQuery("(min-width:900px)");

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
          w="100%"
          h={isLargerThen768 ? "70vh" : "50vh"}
          fontSize="2xl"
          p={4}
          bg="#116D6E"
        >
          <Box color="#CD1818">העגלת קניות ריקה!</Box>
          <Box color="#CD1818" as="ins">
            <Link to="/"> למוצרים</Link>
          </Box>
        </Flex>
      ) : (
        <Media query="(min-width: 900px)">
          {(matches) => {
            return matches ? (
              <Stack bg="#116D6E" isInline gap={3} h="90vh">
                <Stack
                  overflowY={"scroll"}
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#4E3636",
                      borderRadius: "24px",
                    },
                  }}
                  mt="3%"
                  w="50%"
                  h="70vh"
                  ml="7%"
                >
                  {cartItems.map((item) => (
                    <Stack>
                      <HStack
                        key={item._id}
                        gap={16}
                        alignItems="center"
                        w="100%"
                        color="white"
                        bg="#4E3636"
                        boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                      >
                        <Image
                          objectFit="cover"
                          h="90px"
                          w="90px"
                          src={item.image}
                          alt="Caffe Latte"
                        />

                        <Link to={`/product/${item.slug}`}>{item.name}</Link>

                        <Box
                          w="10%"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          key={item._id}
                        >
                          <Button
                            borderRadius="50%"
                            color="white"
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
                            color="white"
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

                        <Flex>{item.price} ₪</Flex>

                        <DeleteIcon
                          color="red.500"
                          onClick={() => RemoovItemHendler(item)}
                        />
                      </HStack>
                    </Stack>
                  ))}
                </Stack>
                <hr />
                <Card bg="#321E1E"  color="white" w="30%" h="160px" display="flex">
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
                      bg="#4E3636"
                      
                    >
                     לקופה
                    </Button>
                  </CardFooter>
                </Card>
              </Stack>
            ) : (
              // <Flex >
                <HStack bg="#116D6E" w="100%" h="100vh">
                <Stack
                  overflowY={"scroll"}
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#4E3636",
                      borderRadius: "24px",
                    },
                  }}
                  mt="3%"
                  w="50%"
                  h="70vh"
                  ml="7%"
                >
                  {cartItems.map((item) => (
                    <GridItem key={item._id}>
                      <Card
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="row"
                        alignItems="center"
                        w="100%"
                        color="white"
                        bg="#4E3636"
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
                  </Stack>

                  <Card bg="#321E1E" w="40%" color="white" h="35%" >
                    <CardBody>
                      <Box fontSize="100%" dir="rtl">
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
                        bg="#4E3636"
                      >
                        לקופה
                      </Button>
                    </CardFooter>
                  </Card>
                </HStack>
            );
          }}
        </Media>
      )}
    </>
  );
}

export default CartScreen;
