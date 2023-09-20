import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from "../Store";


function FaivoritsList() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [data, setData] = useState();
  const user = state.userInfo._id;
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/getAllListFaivoritProps/${user}`)
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const deleteFaivorit = async (item) => {
    console.log(item);
    const requestBody = {
      userId: user,
      productId: item,
    }
    await fetch(`http://localhost:5000/api/users/deleteFaivourite`, {
      body: JSON.stringify(requestBody),
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

        data.map((item, index) => (
          <Flex key={index} direction={"row"} m="1%">
            <Text bg="#00ADB5">{item.name}</Text>
            <Button onClick={() => deleteFaivorit(item._id, user)}>delete</Button>
          </Flex>
        ))

      }
    </Box>
  )
}

export default FaivoritsList