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
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Store } from "../Store";
import { RxHamburgerMenu, RxHome } from "react-icons/rx";
import { LuShoppingCart } from "react-icons/lu";
import { BsFacebook } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {AiOutlineHeart, AiTwotoneHeart}from "react-icons/ai";
function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [count,setCount]=useState("");
  // useEffect(() => {
  //   fetchData();
  //   console.log("uu");
  // })
  const signoutHandlet = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("Paymentmethod");
    window.localStorage.href = "/signin";
  };
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/favorite')
  //     const result = await response.json();
  //     setCount(result.length)
  //     console.log(count);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
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
      <Flex
        py={3}
        bg="#222831"
        color="#EEEEEE"
        fontSize="xl"
        boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
        dir="rtl"
        justifyContent={"space-between"}
        alignItems={"end"}
      >
        <Flex  w={{ base: "45%", sm: "35%", md: "25%", lg: "15%" }} justifyContent={"space-evenly"} alignItems={"end"} >
          <Flex   >
            {!userInfo ? (
              <Link to="/signin">התחבר</Link>
            ) : (
              userInfo.isAdmin ? (
                <Menu >
                  <MenuButton>
                    <RxHamburgerMenu />
                  </MenuButton>
                  <MenuList border="none" bg="#222831" color="#EEEEEE">
                    <MenuItem bg="#222831">
                      {" "}
                      <Link to="/orderhistory">הזמנות</Link>
                    </MenuItem>
                    <MenuItem bg="#222831">
                      {" "}
                      <Link to="/profile">פרופיל</Link>
                    </MenuItem>

                    <MenuItem bg="#222831">
                      <Link to="/signIn" onClick={signoutHandlet}>
                        התנתק
                      </Link>
                    </MenuItem>
                    <MenuItem bg="#222831">
                      <Link to="/" >
                        דף הבית
                      </Link>
                    </MenuItem >
                    <Link to="/Admin/products">
                      <MenuItem bg="#222831">מוצרים</MenuItem>
                    </Link>
                    <Link to="/Admin/orders">
                      <MenuItem bg="#222831">הזמנות</MenuItem>
                    </Link>
                    <Link to="/Admin/users">
                      <MenuItem bg="#222831">משתמשים</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              ) : (
                <HStack color="#EEEEEE"  >
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
              ))}
          </Flex>
          <Flex >
            <Link to="/">
              <RxHome size={25} />
            </Link>
          </Flex>
          <Flex >
            <Link to="/cart">
              {cart.cartItems.length > 0 && (
                <Flex
                textAlign={"end"}
                  fontSize={"70%"}
                  // w="20%"
                  m={"-2"}
                >
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Flex>
              )}
              <LuShoppingCart size={25} />


            </Link>
          </Flex>
        <Link to="/faivoritList">
          {count > 0 ?(

            <AiTwotoneHeart size={25} color="red" />
            ):(
            <AiOutlineHeart color="red" size={25}/>

          )}

        </Link>
        </Flex>

        <Flex w={{ base: "30%", sm: "20%", md: "10%" }} justifyContent="space-around" color="#EEEEEE">
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

      </Flex>
    </Box>
  );
}

export default NavBar;
