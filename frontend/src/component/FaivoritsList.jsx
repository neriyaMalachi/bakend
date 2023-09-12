import { Box } from '@chakra-ui/react'
import React from 'react'

function FaivoritsList() {
  const getFaivorit=()=>{
    fetch("http://localhost:5000/api/propertis/faivorite/add", {
      method: "GET",
    })
      .then((res) => res.json())
  }
  console.log(getFaivorit);
  return (
   <Box bg="#393E46" h="80vh">
faivoritList
   </Box>
  )
}

export default FaivoritsList