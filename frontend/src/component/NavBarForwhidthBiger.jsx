import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavBarForwhidthBiger() {
  return (
    <Flex
    >

        <Link to="/orderhistory">Order History</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/signin">Signout</Link>

    </Flex>
  )
}

export default NavBarForwhidthBiger