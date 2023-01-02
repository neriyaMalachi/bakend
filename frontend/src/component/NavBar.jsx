import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <Grid bg="black" h="50px">
      <GridItem>
        <Link color="yellow" to="/">
          Home
        </Link>
      </GridItem>
    </Grid>
  )
}

export default NavBar