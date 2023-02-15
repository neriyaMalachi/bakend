import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import NavBarForwhidthBiger from "./NavBarForwhidthBiger";
import NavBarForwhidthstandart from "./NavBarForwhidthstandart";
function NavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [maxWidthforHamborger] = useMediaQuery("(min-width:678px)");
  // const signoutHandlet = () => {
  //   ctxDispatch({ type: "USER_SIGNOUT" });
  //   localStorage.removeItem("userInfo");
  //   localStorage.removeItem("shippingAddress");
  //   localStorage.removeItem("Paymentmethod");
  //   window.localStorage.href = "/signin";
  // };

  return (
    <Grid>
      <GridItem>
        <Box bg="black" color="white" textAlign="center">
          {" "}
          499 משלוחים{" "}
          <Text as="b" fontSize="120%" color="yellow.200">
            חינם
          </Text>{" "}
          לכל הארץ בהזמנה מעל{" "}
        </Box>
      </GridItem>

      <GridItem
        color="whitesmoke"
        bg="black"
        h="100%"
        display="flex"
        justifyContent="space-between"
        textDecorationLine="underline"
        alignItems="center"
        fontSize="xl"
        boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
             >
        <ToastContainer position="bottom-center" limit={1} />
        {/* link for home page */}
        <GridItem>
          <Link to="/">דף הבית</Link>
        </GridItem>

        {/* Soping Cart */}
        <GridItem textAlign="center">
          {cart.cartItems.length > 0 && (
            <Button borderRadius="40%" bg="red" size="xs">
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </Button>
          )}
          <Link to="/cart">עגלת קניות</Link>
        </GridItem>
        {/* Hamborger nav bar risponsiv */}
        <GridItem display="flex" justifyContent="flex-end">

          {!userInfo ? (
            <Card>
              <Link to="/signin">Sign In</Link>
            </Card>
          ) : userInfo && maxWidthforHamborger ? (
            <NavBarForwhidthBiger />
          ) : (
            <NavBarForwhidthstandart />
          )}

          {userInfo && userInfo.isAdmin && (
            <Box title="Admin">
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      bg="yellow"
                      color="red"
                    >
                      {isOpen ? "Close" : "Admin"}
                    </MenuButton>
                    <MenuList color="black">
                      <Link to="/Admin/dashboard">
                        <MenuItem>Dashbord</MenuItem>
                      </Link>
                      <Link to="/Admin/products">
                        <MenuItem>Products</MenuItem>
                      </Link>
                      <Link to="/Admin/orders">
                        <MenuItem>Orders</MenuItem>
                      </Link>
                      <Link to="/Admin/users">
                        <MenuItem>Users</MenuItem>
                      </Link>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          )}
        </GridItem>
      </GridItem>
    </Grid>
  );
}

export default NavBar;
