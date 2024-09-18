import React from "react";
import {
  Box,
  CardBody,
  CardFooter,
  Image,
  Card,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Grid,
  GridItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Searchfile";
import { HashLoader } from "react-spinners";
function Products() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const overlay = React.useState(<OverlayOne />);
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
    return <EditProduct item={item} />;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Grid>
        <GridItem
          bg="#393E46"
          h={"90vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <HashLoader color="#00ADB5" />
        </GridItem>
      </Grid>
    );
  } else {
    return (
      <Box bg="#393E46" minH="100vh" p={4}>
        <Flex
          h="110px"
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          mb={6}
        >
          <AddProduct />
          <Search handleSearch={setSearch} />
        </Flex>
    
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-evenly"
          bg="#393E46"
          w="100%"
          minH="70vh"
        >
          {items
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((item) => (
              <Card
                my={5}
                mx={2}
                shadow="lg"
                w="100%"
                maxW="350px"
                bg="#222831"
                color="white"
                borderRadius="md"
                overflow="hidden"
                key={item._id}
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
              >
                <VStack key={item._id}>
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={item.image}
                    alt={item.name}
                  />
                  <CardBody dir="rtl" textAlign="right" p={4}>
                    <Heading py="2" size="md">
                      שם: {item.name}
                    </Heading>
                    <Text> קטגוריה: {item.category}</Text>
                    <Text> פירוט: {item.description}</Text>
                    <Text> מחיר: {item.price} ₪ </Text>
                    <Text> כמות: {item.countInStock}</Text>
                    <Text> מותג: {item.brand}</Text>
                    <Text> דירוג: {item.rating}</Text>
                    <Text> ביקורות: {item.numReviews}</Text>
                  </CardBody>
                  <CardFooter display="flex" justifyContent="space-between" w="100%" p={4}>
                    <Button
                      onClick={onOpen}
                      variant="solid"
                      colorScheme="red"
                      size="sm"
                    >
                      מחק מוצר
                    </Button>
                    <Modal isCentered isOpen={isOpen} onClose={onClose}>
                      {overlay}
                      <ModalContent dir="rtl">
                        <ModalHeader>אתה בטוח?</ModalHeader>
                        <ModalFooter>
                          <Button onClick={onClose}>ביטול</Button>
                          <Button
                            
                            colorScheme="red"
                            onClick={() => {
                              deleteProduct(item._id);
                              onClose();
                            }}
                          >
                            מחק
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
    
                    <Link to={`/Admin/EditProductes/${item._id}`}>
                      <Button size="sm" bg="green.400">
                        עדכן מוצר
                      </Button>
                    </Link>
                  </CardFooter>
                </VStack>
              </Card>
            ))}
        </Box>
      </Box>
    );
    
  }
}

export default Products;
