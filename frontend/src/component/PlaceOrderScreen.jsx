import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import CheckOutSteps from "./CheckOutSteps";

function PlaceOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, useInfo } = state;

  return (
    <>
      <ChakraProvider>
        <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
        <Helmet>
          <title>Preview Order</title>
        </Helmet>

        <Card>
          <CardHeader>Preview Order</CardHeader>

          <CardBody>

<Text fontSize="xl">Name:</Text>{cart.shippingAddress.fullName}<br/>
<Text fontSize="xl">Address:</Text>{cart.shippingAddress.address},
{cart.shippingAddress.city},{cart.shippingAddress.postalCode},
{cart.shippingAddress.country}

          </CardBody>
          <CardFooter>
            <Link to="/shipping">Edit</Link>
          </CardFooter>
        </Card>
      </ChakraProvider>
    </>
  );
}

export default PlaceOrderScreen;
