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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  useEffect(() => {
    getProducts();
  }, [ ]);
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
        <GridItem bg="#393E46" h={"90vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
          <HashLoader color="#00ADB5" />
        </GridItem>
      </Grid>)
  } else {
    return (
      <Box
        bg="#393E46"
      >
        <Flex h="110px" direction={"column"} justifyContent={"space-around"} alignItems={"center"}>
          <AddProduct />
          <Search handleSearch={setSearch} />
        </Flex>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-evenly"
          w="100%"
          bg="#393E46"
          minH={"70vh"}
        >
          {items
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search)
            })
            .map((item, index) => (
              <Card
                my={5}
                mx={2}
                shadow={"dark-lg"}
                display="flex"
                alignContent="flex-start"
                w="100%"
                maxW={"350px"}
                bg="#222831"
                color="white"
                key={index}
              >
                <VStack>
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={item.image}
                    alt={item.name}
                  />
                  <CardBody dir="rtl" >
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
                      onClick={() =>
                        onOpen()
                      }
                      variant="solid"
                      colorScheme="red"
                      m="1%"
                    >
                      מחק מוצר
                    </Button>
                    <Modal isCentered isOpen={isOpen} onClose={onClose}>
                      {overlay}
                      <ModalContent dir="rtl" >
                        {/* <ModalCloseButton /> */}
                        <ModalHeader>אתה בטוח </ModalHeader>
                        <ModalFooter>
                          <Button onClick={onClose}>ביטול</Button>
                          <Button bg="none" onClick={() => {
                            deleteProduct(item._id)
                            onClose()
;                          }}>מחק</Button>

                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <Link to={"/Admin/EditProductes/" + item._id}>
                      <Button m="1%" bg="green.400">עדכן מוצר</Button>
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
