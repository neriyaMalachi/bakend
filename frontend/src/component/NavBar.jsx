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
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
function NavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandlet = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <Grid
      bg="black"
      h="50px"
      display="flex"
      justifyContent="space-evenly"
      textDecorationLine="underline"
      alignItems="center"
    >
      <GridItem>
        <Link to="/">דף הבית</Link>
      </GridItem>
      <GridItem textAlign="center">
        {cart.cartItems.length > 0 && (
          <Button borderRadius="40%" bg="red">
            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
          </Button>
        )}
        <Link color="green" to="/cart">
          הגלת קניות
        </Link>
      </GridItem>
      <GridItem>
        {userInfo ? (
          <Menu title={userInfo.name}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              w="200%"
             
              borderRadius="30%"
              p="35%"
            />
            <MenuList zIndex={1}>
              <Link to="/profil">
                {" "}
                <MenuItem >User Profile</MenuItem>
              </Link>

              <Link to="/orderhistory">
                {" "}
                <MenuItem >Order History</MenuItem>
              </Link>
              <Link to="#signout" onClick={signoutHandlet}>
                <MenuItem >Sign Out</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        ) : (
          <Card>
            <Link to="/signin">Sign In</Link>
          </Card>
        )}
      </GridItem>
    </Grid>
  );
}

export default NavBar;
