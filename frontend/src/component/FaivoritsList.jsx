import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Cards from './Cards';

function FaivoritsList() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/favorite')
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    console.log(data);
    fetchData();
  }, [])
 
  return (
    <Box
    display="flex"
    flexWrap="wrap"
    justifyContent="space-evenly"
    minH={"70vh"}
    >
      {data &&
   (   
        data.map(item => (
          <Cards product={item} key={item.slug} />
        ))
    )
      }
    </Box>
  )
}

export default FaivoritsList