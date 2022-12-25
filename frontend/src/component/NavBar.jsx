import { Grid, GridItem,Link } from '@chakra-ui/react'
import React from 'react'

function NavBar() {
  return (
    <Grid bg="black" h="50px">
      <GridItem>
        <Link color="yellow" href="/">
          Home
        </Link>
      </GridItem>
    </Grid>
  )
}

export default NavBar