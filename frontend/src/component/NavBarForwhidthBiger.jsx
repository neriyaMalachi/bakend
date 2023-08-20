import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
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
import { LuShoppingCart } from "react-icons/lu";
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
    <>
      <Box bg="#222831" color="white" textAlign="center">
        {" "}
        699 משלוחים{" "}
        <Text as="b" fontSize="120%" color="#00ADB5">
          חינם
        </Text>{" "}
        לכל הארץ בהזמנה מעל{" "}
      </Box>
      <HStack
        py={2}
        gap={8}
        bg="#222831"
        color="whitesmoke"
        fontSize="xl"
        boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
        dir="rtl"
      >

        <ToastContainer />

        {!userInfo ? (
          <HStack spacing={5}>

            <Link to="/">דף הבית</Link>

            <Link to="/signin">התחבר</Link>
          </HStack>
        ) : (
          userInfo.isAdmin ? (
            <HStack gap={12} >
              {/* dark mode and light mode and hamburger */}
              <HStack>
                <Menu>
                  <MenuButton>
                    <RxHamburgerMenu />
                  </MenuButton>
                  <MenuList color="#EEEEEE">
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
                    <MenuItem>
                      <Link to="/" >
                        דף הבית
                      </Link>
                    </MenuItem>
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
                </Menu>

              </HStack>
              )

            </HStack>
          ) : (
            <HStack color="#EEEEEE" gap={12} >
              {/* dark mode and light mode and hamburger */}
              <HStack>
                <Menu>
                  <MenuButton>
                    <RxHamburgerMenu />
                  </MenuButton>
                  <MenuList color="#EEEEEE">
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
                    <MenuItem>
                      <Link to="/" >
                        דף הבית
                      </Link>
                    </MenuItem>
                  </MenuList>
                </Menu>

              </HStack>
              )

            </HStack>
          ))}
        <Stack  >
          {cart.cartItems.length > 0 && (
            <Button
              _hover={"none"}
              ml="10"
              mt="1"
              // borderRadius="40%"
              bg="none"
              size="xs"
            >
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </Button>
          )}

          <Link to="/cart">
            <Button _hover={"none"}
              bg="none" mt="-11" ml="5" >
              <LuShoppingCart size={25} />
            </Button>
          </Link>
        </Stack>
      </HStack>
    </>
  );
}

export default NavBarForwhidthBiger;
