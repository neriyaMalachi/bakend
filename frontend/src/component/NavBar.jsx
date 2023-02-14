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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { HamburgerIcon } from "@chakra-ui/icons";
function NavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandlet = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("Paymentmethod");
    window.localStorage.href = "/signin";
  };

  return (
    <Grid
      // opacity={0.5}
      color="whitesmoke"
      bg={
        " radial-gradient(circle, rgba(252,130,69,0.5606617647058824) 0%, rgba(189,68,68,1) 0%, rgba(74,69,52,1) 15%, rgba(3,3,3,1) 100%)"
      }
      h="100%"
      display="flex"
      justifyContent="space-between"
      textDecorationLine="underline"
      alignItems="center"
      fontSize="xl"
      boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
    >
      <ToastContainer position="bottom-center" limit={1} />
      <GridItem>
        <Link to="/">דף הבית</Link>
      </GridItem>
      <GridItem textAlign="center">
        {cart.cartItems.length > 0 && (
          <Button borderRadius="40%" bg="red" size="xs">
            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
          </Button>
        )}
        <Link to="/cart">עגלת קניות</Link>
      </GridItem>
      <GridItem display="flex" justifyContent="flex-end">
        {userInfo ? (
          <Menu title={userInfo.name}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              borderRadius="30%"
            />
            <MenuList
              bg={
                " radial-gradient(circle, rgba(252,130,69,0.5606617647058824) 0%, rgba(189,68,68,1) 0%, rgba(74,69,52,1) 15%, rgba(3,3,3,1) 100%)"
              }
              color="whiteSmock"
            >
              <Link to="/profile">
                {" "}
                <MenuItem
                  bg={
                    " radial-gradient(circle, rgba(252,130,69,0.5606617647058824) 0%, rgba(189,68,68,1) 0%, rgba(74,69,52,1) 15%, rgba(3,3,3,1) 100%)"
                  }
                >
                  User Profile
                </MenuItem>
              </Link>

              <Link to="/orderhistory">
                {" "}
                <MenuItem
                  bg={
                    " radial-gradient(circle, rgba(252,130,69,0.5606617647058824) 0%, rgba(189,68,68,1) 0%, rgba(74,69,52,1) 15%, rgba(3,3,3,1) 100%)"
                  }
                >
                  Order History
                </MenuItem>
              </Link>
              <Link to="/signin" onClick={signoutHandlet}>
                <MenuItem
                  bg={
                    " radial-gradient(circle, rgba(252,130,69,0.5606617647058824) 0%, rgba(189,68,68,1) 0%, rgba(74,69,52,1) 15%, rgba(3,3,3,1) 100%)"
                  }
                >
                  Sign Out
                </MenuItem>
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
