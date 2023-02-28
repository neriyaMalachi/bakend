import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Store } from "../Store";

function NavBarForwhidthBiger() {
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
    <Box>
      <Grid>
        <GridItem>
          <Box bg="black" color="white" textAlign="center">
            {" "}
            699 משלוחים{" "}
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
          textDecorationLine="none"
          alignItems="center"
          fontSize="xl"
          boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
        >
          <ToastContainer />
          {/* link for home page */}
          <GridItem>
            <Link to="/">דף הבית</Link>
          </GridItem>

          {/* Shoping Cart  */}
          <GridItem textAlign="center">
            {cart.cartItems.length > 0 && (
              <Button borderRadius="40%" bg="red" size="xs">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Button>
            )}
            <Link to="/cart">עגלת קניות</Link>
          </GridItem>

          <GridItem w="50%">
            {!userInfo ? (
              <Flex justifyContent="end" color="whitesmoke">
                <Link to="/signin">Sign In</Link>
              </Flex>
            ) : (
              <GridItem w="100%">
                <Flex display="flex" justifyContent="space-around">
                  <Link to="/orderhistory">הזמנות</Link>
                  <Link to="/profile">פרופיל</Link>
                  <Link to="/signIn" onClick={signoutHandlet}>
                    התנתק
                  </Link>
                </Flex>
              </GridItem>
            )}
          </GridItem>
          <GridItem>
            {userInfo && userInfo.isAdmin && (
              <Box title="Admin">
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        color="red"
                      >
                        {isOpen ? "סגור" : "מנהל"}
                      </MenuButton>
                      <MenuList color="black">
                       
                        <Link to="/Admin/products">
                          <MenuItem>מוצרים</MenuItem>
                        </Link>
                        <Link to="/Admin/orders">
                          <MenuItem>הזמנות</MenuItem>
                        </Link>
                        <Link to="/Admin/users">
                          <MenuItem>משתמשים</MenuItem>
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
    </Box>
  );
}

export default NavBarForwhidthBiger;