import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
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
import imagecart from "../img/image-for-cart.png";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const toast = useToast();
  const { cart: { cartItems } } = state;
  const navigate = useNavigate();

  const UpdateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/propertis/${item._id}`);

    if (data.countInStock < quantity) {
      toast({
        title: "בעיה",
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

  const RemoovItemHandler = (item) => {
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
          py="80px"
          h={isLargerThan768 ? "75vh" : "50vh"}
          fontSize="2xl"
          bg="#393E46"
          color="#EEEEEE"
        >
          <Box>העגלת קניות ריקה!</Box>
          <Image maxW="20vw" src={imagecart} alt="Empty Cart" />
          <Button
            maxW="250px"
            w="full"
            onClick={() => navigate("/")}
            variant="outline"
            colorScheme="cyan"
            _hover={{ bg: "cyan.500", color: "white" }}
          >
            למוצרים
          </Button>
        </VStack>
      ) : (
        <Flex
          dir="rtl"
          flexDirection="column"
          bg="#393E46"
          h="100vh"
          p="2%"
        >
          {isLargerThan768 ? (
            <HStack
              bg="#393E46"
              justifyContent="space-around"
              h="100%"
            >
              <Stack
                overflowY="scroll"
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
                w="50%"
                h="70vh"
                p="2%"
              >
                {cartItems.map((item) => (
                  <HStack
                    key={item._id}
                    justifyContent="space-between"
                    alignItems="center"
                    bg="#222831"
                    color="#EEEEEE"
                    boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                    borderRadius={10}
                    p={4}
                  >
                    <Image
                      objectFit="cover"
                      h="90px"
                      w="90px"
                      src={item.image}
                      alt={item.name}
                    />
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    <Box
                      w="15%"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
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
                      </Button>
                      <Text>{item.quantity}</Text>
                      <Button
                        color="white"
                        colorScheme="white"
                        borderRadius="50%"
                        onClick={() => {
                          if (item.quantity !== 1) {
                            UpdateCartHandler(item, item.quantity - 1);
                          }
                        }}
                        disabled={item.quantity === 1}
                      >
                        -
                      </Button>
                    </Box>
                    <Flex>₪{item.price}</Flex>
                    <DeleteIcon
                      color="red.500"
                      onClick={() => RemoovItemHandler(item)}
                    />
                  </HStack>
                ))}
              </Stack>
              <Card
                borderRadius={20}
                bg="#222831"
                color="#EEEEEE"
                w="20%"
                h="60vh"
                display="flex"
                flexDirection="column"
              >
                <CardBody>
                  <Text fontSize="2xl">
                    כמות מוצרים: {cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Text>
                  <Text fontSize="2xl">
                    ש"ח: {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </Text>
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
            </HStack>
          ) : (
            <VStack
              bg="#393E46"
              w="100%"
              h="100vh"
              spacing={4}
              p="2%"
            >
              <Stack
                overflowY="scroll"
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
                w="90%"
                h="40vh"
              >
                {cartItems.map((item) => (
                  <HStack
                    key={item._id}
                    justifyContent="space-between"
                    alignItems="center"
                    bg="#222831"
                    color="#EEEEEE"
                    boxShadow="2px 30px 40px -22px rgba(0,0,0,0.75)"
                    borderRadius={10}
                    p={4}
                  >
                    <SmallCloseIcon
                      color="red.500"
                      boxSize={7}
                      onClick={() => RemoovItemHandler(item)}
                    />
                    <Box h="100%" display="flex" flexDirection="column" alignItems="center">
                      <Box display="flex" alignItems="center" fontSize="xl">
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
                        </Button>
                        <Text>{item.quantity}</Text>
                        <Button
                          color="white"
                          bg="none"
                          fontSize="xl"
                          onClick={() => {
                            if (item.quantity > 1) {
                              UpdateCartHandler(item, item.quantity - 1);
                            }
                          }}
                          disabled={item.quantity === 1}
                        >
                          <TriangleDownIcon boxSize={3} />
                        </Button>
                      </Box>
                      <Box fontSize="lg">₪{item.price}</Box>
                    </Box>
                    <Image
                      objectFit="cover"
                      h="100%"
                      w="20%"
                      src={item.image}
                      alt={item.name}
                    />
                  </HStack>
                ))}
              </Stack>
              <Card bg="#222831" w="90%" color="#EEEEEE" h="35%">
                <CardBody>
                  <Text fontSize="xl">
                    כמות מוצרים: {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    <hr />
                    ש"ח: {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </Text>
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
          )}
        </Flex>
      )}
    </>
  );
}

export default CartScreen;
