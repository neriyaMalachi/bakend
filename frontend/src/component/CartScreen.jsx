import React from "react";
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";


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
      <hr />
{cartItems.length === 0 ?(
  <Box bg='tomato' w='100%' p={4} color='white'>
  Cart is empty. <Link to="/">Go Shoping</Link>

</Box>

):(
  <Stack isInline gap={3}  >
  <Grid w="100%"    >
    {cartItems.map((item) => (
      <GridItem gridGap={2} mt="2%">
      <Card
        direction={{ base: "column", xl: "row" }}
        overflow="hidden"
        variant="outline"
        key={item._id}
        
        justifyContent="space-around"
        alignItems="center"
        w="100%"
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
          
        >
          <Button
         
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
            
            borderRadius="50%"
            variant="solid"
            colorScheme="blue"
            h="20%"
            disabled={item.quantity === item.countInStock}
          >
            -
          </Button>
        </Box>
        <Box>{item.price}</Box>
        <Button border="none" bg="white">
          <DeleteIcon w={20} h={20} color="red.500" />
        </Button>
      
      </Card>
      <hr />
      </GridItem>
      
    ))}
    
  </Grid>
  <hr />
  <Card bg="red" w="30%" h="160px" display='flex'>
    <CardBody  >
      <h3 dir="rtl">
   כמות מוצרים    {" - "} {cartItems.reduce((a, c) => a + c.quantity, 0)}
        <hr />
        ש"ח :{" "}{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
      </h3>
      <hr />
    </CardBody>
  </Card>
</Stack>
)}

     
    </>
  );
}

export default CartScreen;
