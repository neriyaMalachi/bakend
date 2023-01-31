import {
  Button,
  Card,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import {  HamburgerIcon } from "@chakra-ui/icons";
function NavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandlet = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("Paymentmethod");

  };

  return (
    
    <Grid
      bg="black"
      color="whitesmoke"
      h="50px"
      display="flex"
      justifyContent="space-between"
      textDecorationLine="underline"
      alignItems="center"
      fontSize="xl"
 
      boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
    >
      <ToastContainer position="bottom-center"  limit={1} />
      <GridItem>
        <Link  to="/">דף הבית</Link>
      </GridItem>
      <GridItem textAlign="center">
        {cart.cartItems.length > 0 && (
          <Button borderRadius="40%" bg="red"  size="xs">
            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
          </Button>
        )}
        <Link  to="/cart">
          עגלת קניות
        </Link>
      </GridItem>
      <GridItem   display="flex" justifyContent="flex-end">
        {userInfo ? (
          <Menu title={userInfo.name}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              borderRadius="30%"
            />
            <MenuList bg="black" >
              <Link to="/profil">
                {" "}
                <MenuItem textColor="black" >User Profile</MenuItem>
              </Link>

              <Link to="/orderhistory">
                {" "}
                <MenuItem textColor="black">Order History</MenuItem>
              </Link>
              <Link to="#signout" onClick={signoutHandlet}>
                <MenuItem textColor="black" >Sign Out</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        ) : (
          <Card  textColor="white">
            <Link to="/signin">Sign In</Link>
          </Card>
        )}
      </GridItem>
    </Grid>
  );
}

export default NavBar;
