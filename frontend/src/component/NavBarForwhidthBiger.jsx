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
import { GrCart } from "react-icons/gr";
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
        gap={4}
        bg="#222831"
        color="whitesmoke"
        fontSize="xl"
        boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
        dir="rtl"
      >

        <ToastContainer />
        <HStack >

          {!userInfo ? (
            <HStack gap={12}>

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

        </HStack>
        <HStack color={"white"} textAlign="center">
          {cart.cartItems.length > 0 && (
            <Button
              _hover={"none"}
              m="-5"
              mt="-10"
              borderRadius="40%"
              bg="none"
              size="xs"
            >
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </Button>
          )}
          <Link to="/cart">
            <GrCart size={25} />
          </Link>
        </HStack>
        <IconButton
          bg={"none"}
          color={"white"}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          _hover={"none"}
        />
      </HStack>
    </>
  );
}

export default NavBarForwhidthBiger;
