import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  Flex,
  Grid,
  GridItem,
  Text,
  CSSReset,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Store } from "../Store";
import DarkModeSwitch from "../Style/DarkModeSwitch";

function NavBarForwhidthstandart() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [maxWidthforHamborger] = useMediaQuery("(min-width:678px)");
  const signoutHandlet = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("Paymentmethod");
    window.localStorage.href = "/signin";
  };

  return (
    // <Box display="flex" justifyContent="flex-end">
    //   <Menu title={userInfo.name}>
    //     <MenuButton
    //       as={IconButton}
    //       aria-label="Options"
    //       icon={<HamburgerIcon />}
    //       variant="outline"
    //       borderRadius="30%"
    //     />
    //     <MenuList color="black">
    //       <Link to="/profile">
    //         {" "}
    //         <MenuItem>User Profile</MenuItem>
    //       </Link>

    //       <Link to="/orderhistory">
    //         {" "}
    //         <MenuItem>Order History</MenuItem>
    //       </Link>
    //       <Link to="/signin" onClick={signoutHandlet}>
    //         <MenuItem>Sign Out</MenuItem>
    //       </Link>
    //     </MenuList>
    //   </Menu>
    //   {userInfo && userInfo.isAdmin && (
    //     <Box title="Admin">
    //       <Menu>
    //         {({ isOpen }) => (
    //           <>
    //             <MenuButton
    //               isActive={isOpen}
    //               as={Button}
    //               rightIcon={<ChevronDownIcon />}
    //               bg="yellow"
    //               color="red"
    //             >
    //               {isOpen ? "Close" : "Admin"}
    //             </MenuButton>
    //             <MenuList color="black">
    //               <Link to="/Admin/dashboard">
    //                 <MenuItem>Dashbord</MenuItem>
    //               </Link>
    //               <Link to="/Admin/products">
    //                 <MenuItem>Products</MenuItem>
    //               </Link>
    //               <Link to="/Admin/orders">
    //                 <MenuItem>Orders</MenuItem>
    //               </Link>
    //               <Link to="/Admin/users">
    //                 <MenuItem>Users</MenuItem>
    //               </Link>
    //             </MenuList>
    //           </>
    //         )}
    //       </Menu>
    //     </Box>
    //   )}
    // </Box>
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

          <Flex w="65%" justifyContent="space-around">
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
          </Flex>
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
                        w="92%"
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
          <GridItem w="10%">
            {!userInfo ? (
              <Flex justifyContent="end" color="whitesmoke">
                <Link to="/signin">התחבר</Link>
                <CSSReset />
                <DarkModeSwitch />
              </Flex>
            ) : (
              <GridItem w="100%">
                <Flex display="flex" justifyContent="end">
                  <Menu title={userInfo.name}>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HamburgerIcon />}
                      variant="outline"
                      borderRadius="30%"
                    />
                    <MenuList color="black">
                      <Link to="/profile">
                        {" "}
                        <MenuItem>User Profile</MenuItem>
                      </Link>

                      <Link to="/orderhistory">
                        {" "}
                        <MenuItem>Order History</MenuItem>
                      </Link>
                      <Link to="/signin" onClick={signoutHandlet}>
                        <MenuItem>Sign Out</MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                </Flex>
              </GridItem>
            )}
          </GridItem>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default NavBarForwhidthstandart;
