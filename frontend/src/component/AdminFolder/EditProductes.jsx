import { Card, Flex, Input, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Store } from "../../Store";

function EditProductes() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name,setName]=useState(userInfo.name)
  const [category,setCategory]=useState(userInfo.category)
  const [price,setPrice]=useState(userInfo.price)
  const [countInStock,setCountInStock]=useState(userInfo.countInStock)
  const [description,setDescription]=useState(userInfo.description)

  return (
    <Flex
      h="70vh"
      w="100%"
      justifyContent="space-around"
      alignItems="center"
      direction="column"
      color="white"
    >
      <Text fontSize="4xl">Edit</Text>
      <Input placeholder="name" value={name} w="50%" />
      <Input placeholder="category" value={category} w="50%" />
      {/* <Input placeholder='image' value={} /> */}
      <Input placeholder="price" value={price} w="50%" />
      <Input placeholder="count In Stock" value={countInStock} w="50%" />
      <Input placeholder="description" value={description} w="50%" />
    </Flex>
  );
}

export default EditProductes;
