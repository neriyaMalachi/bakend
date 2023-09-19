import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Cards from './Cards';

function FaivoritsList() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/getAllListFaivoritProps')
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

 const deleteFaivorit= async(item)=>{
  await fetch(`http://localhost:3000/api/favorite/deleteFaivorit/${item}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((result) => {
        result.json().then((resp) => {
          fetchData();
        });
      })
 }
  return (
    <Box
  
    minH={"75vh"}
    >
      <Text textAlign={"center"} fontSize={"xx-large"}>מועדפים</Text>
      {data &&
   (   
        data.map(item => (
          <Flex direction={"row"} m="1%" key={item._id}>
          <Text  bg="#00ADB5">{item.name}</Text>
          <Button onClick={()=>deleteFaivorit(item._id)}>delete</Button>
          </Flex>
          ))
    )
      }
    </Box>
  )
}

export default FaivoritsList