import { Button, Card, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditProductes() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
const params = useParams();

  const Editproduact = () => {
    console.log(name, category, price, countInStock, description);
  };
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
      <Input
        placeholder="name"
        value={name}
        w="50%"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        placeholder="category"
        value={category}
        w="50%"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {/* <Input placeholder='image' value={} /> */}
      <Input
        placeholder="price"
        value={price}
        w="50%"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <Input
        placeholder="count In Stock"
        value={countInStock}
        w="50%"
        onChange={(e) => {
          setCountInStock(e.target.value);
        }}
      />
      <Input
        placeholder="description"
        value={description}
        w="50%"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Button bg="yellow.400" onClick={() => Editproduact()}>
        עדכן
      </Button>
    </Flex>
  );
}

export default EditProductes;
