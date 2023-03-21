import { Button, Card, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditProductes() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(
      `http://localhost:3000/api/propertis/${params.id}`
    );
    result = await result.json();
    console.log(result);
    setName(result.name);
    setCategory(result.category);
    setCountInStock(result.countInStock);
    setPrice(result.price);
    setDescription(result.description);
  };

  const Editproduact = async () => {
    console.log(name, category, price, countInStock, description);

    let result = await fetch(
      `http://localhost:3000/api/propertis/updateProducts/${params.id}`,
      {
        method: "put",
        body: JSON.stringify({
          name,
          category,
          price,
          countInStock,
          description,
          brand,
          rating,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      navigate("/Admin/products");
    }
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
        placeholder="Rating"
        value={rating}
        w="50%"
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
            <Input
        placeholder="Brand"
        value={brand}
        w="50%"
        onChange={(e) => {
          setBrand(e.target.value);
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
