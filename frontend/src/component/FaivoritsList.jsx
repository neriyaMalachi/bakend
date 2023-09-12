import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function FaivoritsList() {
  const getFaivorit=()=>{
    fetch("http://localhost:5000/api/propertis/faivorite/add", {
      method: "GET",
    })
      .then((res) => res.json())
  }
  console.log({getFaivorit});
  return (
   <Box bg="#393E46" h="80vh">
{/* {getFaivorit.map((item)=>(
  <Text>{item.name}</Text>
))} */}
   </Box>
  )
}

export default FaivoritsList