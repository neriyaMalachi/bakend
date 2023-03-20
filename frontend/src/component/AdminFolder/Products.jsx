import React from "react";
import {
  Box,
  CardBody,
  CardFooter,
  Image,
  Card,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { Link, useNavigate } from "react-router-dom";
function Products() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("http://localhost:5000/api/propertis", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const deleteProduct = async (id) => {
    console.log(id);
    await fetch(`http://localhost:3000/api/propertis/deleteProduct/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getProducts();
      });
    });
  };

  const EditProduct = (item) => {
    console.log({ item });
    navigate("/admin/EditProductes");
    return(<EditProduct item={item} />)
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box bg="silver">
        <AddProduct />
        {items.map((item) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            key={item._id}
            dir="rtl"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={item.image}
              alt={item.name}
            />

            <Stack>
              <CardBody>
                <Heading py="2" size="md">
                  {" "}
                  שם:{item.name}
                </Heading>
                <Text> קטגוריה: {item.category}</Text>
                <Text> פירוט:{item.description}</Text>
                <Text> מחיר:{item.price}</Text>
                <Text> כמות :{item.countInStock}</Text>
                <Text>מותג:{item.brand}</Text>
                <Text> דרוג:{item.rating}</Text>
                <Text>ביקורות:{item.numReviews}</Text>
              </CardBody>

              <CardFooter>
                <Button
                  onClick={() => deleteProduct(item._id)}
                  variant="solid"
                  colorScheme="red"
                >
                  מחק מוצר
                </Button>
                <Link 
                to={"/Admin/EditProductes/"+ item._id}
                >
                  עדכן מוצר
                </Link>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Box>
    );
  }
}

export default Products;
