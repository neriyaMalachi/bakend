import React from "react";
import { useState, useEffect } from "react";
import { Box, Image, Button, Link } from "@chakra-ui/react";
// import data from "../data";
import axios from 'axios';


function HomeFile() {
  const [propertis, setPropertis] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/propertis");
      console.log(result);
      setPropertis(result.data);
    };
    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-around"
      bg="silver"
    >
      {propertis.map((product) => (
        <Box
          key={product.name}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="1%"
          border="1px solid"
        >
          <Link href={`/product/${product.name}`}>
            <Image src={product.image} alt={product.name} />

            <Box>{product.name}</Box>
          </Link>
          <Box>
            <strong> {product.price}</strong>
          </Box>
          <Box>{product.rating}</Box>
          <Box>{product.description}</Box>
          <Box>
            <Button colorScheme="red">Add to cart</Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default HomeFile;
