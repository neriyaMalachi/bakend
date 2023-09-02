import { useReducer, useEffect, useState } from "react";
import {
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Form,
  useMediaQuery,
  GridItem,
  Grid,
  Text,
  Flex,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import Cards from "./Cards";
import { Helmet } from "react-helmet-async";
import LoadingBox from "./LoadingBox";
import imagecart from "../img/image-for-cart.png"

import { HashLoader } from "react-spinners"
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, propertis: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function HomeFile() {
  const [{ loading, error, propertis }, dispatch] = useReducer(reducer, {
    propertis: [],
    loading: true,
    error: "",
  });
  const [search, setSerch] = useState("");
  const [isLargerThen768] = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/propertis");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setPropertis(result.data);
    };
    fetchData();
  }, []);

  return loading ? (
    <Grid>
      <GridItem bg="#393E46" h={"90vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
        <HashLoader color="#00ADB5" />
      </GridItem>
    </Grid>
  ) : error ? (
    <Center>{error}</Center>
  ) : (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-evenly"
      w="100%"
      bg="#393E46"
      minH={"70vh"}
    >
      <Helmet>
        <title>דף הבית</title>
      </Helmet>

      <FormControl mt={{base:"30%",sm:"20%" ,md:"7%"} } display="flex" justifyContent="center" alignItems="center">
        <Input
          dir="rtl"
          w="full"
          maxW={!isLargerThen768 ? "350px" : "600px"}
          type="text"
          // mt="1rem"
          // mb="3rem"
          color="#EEEEEE"
          bg="#222831"
          border="none"
          placeholder="חפש..."
          onChange={(e) => {
            setSerch(e.target.value);
          }}
        />

      </FormControl>

      {propertis
        .filter((item) => {
          console.log(propertis.length);
          return search.toLowerCase() === ""
            ? item
            : item.name.toLowerCase().includes(search) 
        })
        .map((product) => (
          product ? (
            <Cards product={product} key={product.slug}></Cards>
          
          ) : (
            <VStack
            dir="rtl"
            py={"80px"}
            h={isLargerThen768 ? "70vh" : "50vh"}
            fontSize="2xl"
            bg="#393E46"
            color="#EEEEEE"
          >
            <Box >אין מוצרים!</Box>
            <Image maxW={"100vw"}  src={imagecart} />
          </VStack>
          )
        ))}
       
    </Box>
  );
}

export default HomeFile;
