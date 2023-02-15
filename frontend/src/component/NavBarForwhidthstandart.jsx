import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useMediaQuery } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Store } from '../Store';

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
                  <MenuItem
                 
                  >
                    Sign Out
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
  )
}

export default NavBarForwhidthstandart