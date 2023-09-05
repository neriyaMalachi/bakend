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
  Stack,
  Text,
  useBreakpoint,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Store } from "../Store";
import { RxHamburgerMenu, RxHome } from "react-icons/rx";
import { LuShoppingCart } from "react-icons/lu";
import { BsFacebook } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function NavBar() {
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
    <Box
    // position="fixed"
    w="100%"
    // zIndex={1}
    >
      <Box bg="#222831" color="white" textAlign="center">
        {" "}
        699 משלוחים{" "}
        <Text as="b" fontSize="120%" color="#00ADB5">
          חינם
        </Text>{" "}
        לכל הארץ בהזמנה מעל{" "}
      </Box>
      <HStack
        py={4}
        gap={3}
        bg="#222831"
        color="whitesmoke"
        fontSize="xl"
        boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
        dir="rtl"
      >

        <ToastContainer  />

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
                  <MenuList  color="#EEEEEE">
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
            <HStack  color="#EEEEEE" gap={12} >
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
          <Link to="/cart">
          {cart.cartItems.length > 0 && (
            <Button
              _hover={"none"}
              mt="-7"
              ml="-7"
              bg="none"
              size="xs"
            >
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </Button>
          )}

            <Button _hover={"none"}
              bg="none"  >
              <LuShoppingCart size={25} />
            </Button>
          </Link>

        </Stack>
        <Link to="/">
          <RxHome size={25} />
        </Link>

      </HStack>

      <Flex display={["none", "flex", "flex", "flex"]}  gap={9} ml="5" mt="-10">
        <Box>
          <BsFacebook size={25} />
        </Box>
        <Box>
          <a href="https://api.whatsapp.com/send?phone=972585202271&text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%AA%D7%95%D7%9B%D7%9C%D7%95%20%D7%9C%D7%99%D7%A6%D7%95%D7%A8%20%D7%90%D7%99%D7%AA%D7%99%20%D7%A7%D7%A9%D7%A8%20%D7%91%D7%94%D7%A7%D7%93%D7%9D%20%D7%94%D7%90%D7%A4%D7%A9%D7%A8%D7%99">
            <FaWhatsapp size={25} />
          </a>
        </Box>
        <Box>
          <HiOutlineMail size={25} />
        </Box>
        </Flex>
    </Box>
  );
}

export default NavBar;
