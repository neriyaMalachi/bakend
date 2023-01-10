import { Box, Button, Center, Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

function NavBar() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Grid
     bg="black" 
     h="50px" 
     display="flex" 
     justifyContent="space-evenly"
     textDecorationLine="underline"
  
     >
      <GridItem bg="yellow">
        <Link  to="/">
          Home
        </Link>
      </GridItem>
      <GridItem bg="yellow"  >
      {cart.cartItems.length > 0 &&
            (
               <Button borderRadius="40%" bg="red" >
               {cart.cartItems.reduce((a , c) => a + c.quantity, 0 )}
               </Button>
            )}
        <Link color="green" bg="transparent"  to="/cart">
          הגלת קניות
         
        </Link>
      
      </GridItem>
      
    </Grid>
  );
}

export default NavBar;
