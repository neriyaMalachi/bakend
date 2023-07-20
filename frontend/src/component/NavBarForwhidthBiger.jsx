import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Store } from "../Store";
import { RxHamburgerMenu } from "react-icons/rx";
function NavBarForwhidthBiger() {
  const { colorMode, toggleColorMode } = useColorMode();
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
          fontSize="xl"
          boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
          dir="rtl"
        >
          {/* <ToastContainer /> */}
          {/* link for home page */}

          <GridItem w="60%">
            {!userInfo ? (
              <Flex
                justifyContent="space-between"
                alignItems="end"
                color="whitesmoke"
              >
                <IconButton
                  bg={"none"}
                  color={"white"}
                  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                  onClick={toggleColorMode}
                />
                <Link to="/">דף הבית</Link>

                <Link to="/signin">התחבר</Link>
              </Flex>
            ) : (
              <Flex justifyContent="space-around" alignItems="center">
                <Menu>
                  <MenuButton>
                    <RxHamburgerMenu />
                  </MenuButton>
                  <MenuList color="black">
                    <MenuItem>
                      {" "}
                      <Link to="/orderhistory">הזמנות</Link>
                    </MenuItem>
                    <MenuItem>
                      {" "}
                      <Link to="/profile">פרופיל</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link to="/signIn" onClick={signoutHandlet}>
                        התנתק
                      </Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <IconButton
                  bg={"none"}
                  color={"white"}
                  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                  onClick={toggleColorMode}
                />
                {/* Shoping Cart  */}
                <GridItem textAlign="center">
                  {cart.cartItems.length > 0 && (
                    <Button borderRadius="40%" bg="red" size="xs">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Button>
                  )}
                  <Link to="/cart">עגלת קניות</Link>
                </GridItem>
              </Flex>
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
