import { Button, Card, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditProductes() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const [image, setImage] = useState("");
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
          slug,
          rating,
          image,
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
      h="90vh"
      w="100%"
      justifyContent="space-around"
      alignItems="center"
      direction="column"
      color="#EEEEEE"
      bg="#393E46"
    >
      <Text fontSize="4xl">שינוי</Text>
      <Input
        placeholder="שם"
        value={name}
        w="50%"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        placeholder="קטגוריה"
        value={category}
        w="50%"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <Input
        placeholder="Slug"
        value={slug}
        w="50%"
        onChange={(e) => {
          setSlug(e.target.value);
        }}
      />
      <Input 
      placeholder='תמונה'
       value={image}
       w="50%"
       onChange={(e) => {
        setImage(e.target.value);
      }}
       
       />
      <Input
        placeholder="מחיר"
        value={price}
        w="50%"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <Input
        placeholder="כמומת במלאי"
        value={countInStock}
        w="50%"
        onChange={(e) => {
          setCountInStock(e.target.value);
        }}
      />
            <Input
        placeholder="המלצות"
        value={rating}
        w="50%"
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
            <Input
        placeholder="מותג"
        value={brand}
        w="50%"
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />
      <Input
        placeholder="הסבר"
        value={description}
        w="50%"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Button bg="#00ADB5" onClick={() => Editproduact()}>
        עדכן
      </Button>
    </Flex>
  );
}

export default EditProductes;
