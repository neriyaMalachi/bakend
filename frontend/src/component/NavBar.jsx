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
import  {
  DeleteIcon,
  HamburgerIcon,
  ExternalLinkIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
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
      title={userInfo.name}
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
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            w="5%"
            h="80%"
    borderRadius="30%"
          />
          <MenuList>
            <MenuItem icon={<DeleteIcon />} >
              <Link to="/profil">User Profile</Link>
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} >
              <Link to="/orderhistory">Order History</Link>
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} >
              <Link to="#signout" onClick={signoutHandlet}>
                Sign Out
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        // <GridItem>
        //   <Link to="/profil">User Profile</Link>
        // </GridItem>
        // <GridItem>
        //   <Link to="/orderhistory">Order History</Link>
        // </GridItem>
        // <GridItem>
        //   <Link to="#signout" onClick={signoutHandlet}>
        //     Sign Out
        //   </Link>
        // </GridItem>
        <Card>
          <Link to="/signin">Sign In</Link>
        </Card>
      )}
      </GridItem>

    </Grid>
  );
}

export default NavBar;
