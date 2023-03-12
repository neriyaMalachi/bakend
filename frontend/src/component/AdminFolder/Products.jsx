import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  CardHeader,
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
function Products() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
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
  }, []);

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
              alt="Caffe Latte"
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
                <Button variant="solid" colorScheme="red">
                  מחק מוצר
                </Button>
                <Button variant="solid" colorScheme="green">
                  עדכן מוצר
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Box>
    );
  }
}

export default Products;
