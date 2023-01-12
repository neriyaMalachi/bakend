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
  CardHeader,
  Grid,
  Heading,
  Image,
  Link,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  console.log(cartItems);
  const DropsTheNumber = () => {};
  const UpsTheNumber = () => {};
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <h1>Shopping Cart</h1>
      <Stack isInline gap={2}>
        <Card w="100%">
          {cartItems.map((item) => (
            <Card
              direction={{ base: "column", xl: "row" }}
              // overflow="hidden"
              variant="outline"
              key={item._id}
              border="1px solid"
              justifyContent="space-around"
              alignItems="center"
              w="100%"
            >
              <Image
                objectFit="cover"
                h="90px"
                src={item.image}
                alt="Caffe Latte"
              />

              {/* <Stack display="flex">
                <CardBody border="1px solid">
                  <Heading size="md">{item.name}</Heading>

                  <Text py="2">{item.description}</Text>
                </CardBody>

                <CardFooter></CardFooter>
              </Stack> */}

<Box>
  <Link  to={`/propertis/${item.slug}`} >{item.name}</Link>
</Box>

              <Box
                w="10%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  // onClick={UpsTheNumber}
                  borderRadius="50%"
                  variant="solid"
                  colorScheme="blue"
                  h="20%"
                  disabled={item.quantity === 1}
                >
                  +
                </Button>{" "}
                <Text>{item.quantity}</Text>{" "}
                <Button
                  // onClick={DropsTheNumber}
                  borderRadius="50%"
                  variant="solid"
                  colorScheme="blue"
                  h="20%"
                  disabled={item.quantity === 1}
                >
                  -
                </Button>
              </Box>
              <Box>{item.price}</Box>
              <Button border="none" bg="white">
                <DeleteIcon w={20} h={20} color="red.500" />
              </Button>
            </Card>
          ))}
        </Card>
        <Card bg="red" w="30%" h="150px" te>
          <CardBody>
            <h3>
              סכו"ם({cartItems.reduce((a, c) => a + c.quantity, 0)}
               כמות מוצרים){cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}:ש"ח
            </h3>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
}

export default CartScreen;
