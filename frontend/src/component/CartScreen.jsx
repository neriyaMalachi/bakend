import React from "react";
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import {
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  List,
  Text,
} from "@chakra-ui/react";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  console.log(cartItems);
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <h1>Shopping Cart</h1>
      <List>
        {/* {cartItems.map((item) => (
          <cartItems key={item._id}>
            <CardHeader>
              <Image src={item.image} alt={item.name}></Image>
            </CardHeader>
            <CardBody>
              <Text>{item.name}</Text>
            </CardBody>
            <CardFooter>

            </CardFooter>
          </cartItems>
        ))} */}
      </List>
    </>
  );
}

export default CartScreen;
