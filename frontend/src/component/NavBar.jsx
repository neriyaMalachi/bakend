import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

function NavBar() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Grid bg="black" h="50px">
      <GridItem>
        <Link color="yellow" to="/">
          Home
        </Link>
      </GridItem>
      <GridItem>
        <Link color="yellow" to="/cart">
          Cart
          {cart.cartItems?.length > 0 &&
            (
               <Box  bg="red" >
               {cart.cartItems?.length}
               </Box>
            )}
        </Link>
      </GridItem>
    </Grid>
  );
}

export default NavBar;
