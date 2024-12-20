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
  Flex,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useMediaQuery,
  useToast,
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
import imagecart from "../img/image-for-cart.png";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isLargerThen768] = useMediaQuery("(min-width:900px)");
  const toast = useToast();
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

  const UpdateCartHandler = async (item, quantity) => {
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
  const RemoovItemHendler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/?redirect=/shipping");
  };
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      {cartItems.length === 0 ? (
        <VStack
          dir="rtl"
          py={"80px"}
          h={isLargerThen768 ? "75vh" : "50vh"}
          fontSize="2xl"
          bg="#393E46"
          color="#EEEEEE"
        >
          <Box>העגלת קניות ריקה!</Box>
          <Image maxW={"20vw"} src={imagecart} />
          <Button
            maxW={"250px"}
            w="full"
            onClick={() => navigate("/")}
            variant={"outline"}
            colorScheme="cyan"
            _hover={"none"}
          >
            {" "}
            למוצרים
          </Button>
        </VStack>
      ) : (
        <Media query="(min-width: 900px)">
          {(matches) => {
            return matches ? (
              <HStack
                bg="#393E46"
                isInline
                justifyContent={"space-around"}
                h="100%"
              >
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
                    <Stack key={item._id}>
                      <HStack
                        justifyContent={"space-around"}
                        alignItems="center"
                        w="100%"
                        color="#EEEEEE"
                        bg="#222831"
                        boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                        borderRadius={10}
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

                <Card
                  borderRadius={20}
                  bg="#222831"
                  color="#EEEEEE"
                  w="20%"
                  h="60vh"
                  display="flex"
                >
                  <CardBody dir="rtl">
                    <Text fontSize={"2xl"}>
                      כמות מוצרים {": "}{" "}
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Text>
                    <Text fontSize={"2xl"}>
                      ש"ח :{" "}
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </Text>
                  </CardBody>
                  <CardFooter dir="rtl">
                    <Button
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                      bg="#00ADB5"
                    >
                      לקופה
                    </Button>
                  </CardFooter>
                </Card>
              </HStack>
            ) : (
              <VStack bg="#393E46" w="100%" h="100vh">
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
                  m="3%"
                  w="90%"
                  h="40vh"
                  // ml="3%"
                >
                  {cartItems.map((item) => (
                    <GridItem key={item._id}>
                      <HStack
                        justifyContent={"space-around"}
                        alignItems="center"
                        color="#EEEEEE"
                        bg="#222831"
                        boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                        borderRadius={10}
                      >
                        <SmallCloseIcon
                          flex="start"
                          color="red.500"
                          boxSize={7}
                          onClick={() => RemoovItemHendler(item)}
                        />
                        <Box h="100%">
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
                                color="white"
                                bg="none"
                                onClick={() =>
                                  UpdateCartHandler(item, item.quantity + 1)
                                }
                                disabled={item.quantity === item.countInStock}
                              >
                                <TriangleUpIcon boxSize={3} />
                              </Button>{" "}
                              <Text>{item.quantity}</Text>{" "}
                              <Button
                                color="white"
                                bg="none"
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
                        <HStack gap={6}>
                          <Box>₪{item.price} </Box>
                        </HStack>

                        <Image
                          objectFit="cover"
                          h="100%"
                          w="20%"
                          src={item.image}
                          alt="Caffe Latte"
                        />
                      </HStack>
                    </GridItem>
                  ))}
                </Stack>
                <Card bg="#222831" w="90%" color="#EEEEEE" h="35%">
                  <CardBody>
                    <Box fontSize="100%" dir="rtl">
                      כמות מוצרים {" - "}{" "}
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                      <hr />
                      ש"ח :{" "}
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </Box>
                    <hr />
                  </CardBody>
                  <CardFooter>
                    <Button
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                      bg="#00ADB5"
                    >
                      לקופה
                    </Button>
                  </CardFooter>
                </Card>
              </VStack>
            );
          }}
        </Media>
      )}
    </>
  );
}

export default CartScreen;
