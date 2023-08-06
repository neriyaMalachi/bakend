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
} from "@chakra-ui/react";
import axios from "axios";
import Cards from "./Cards";
import { Helmet } from "react-helmet-async";
import LoadingBox from "./LoadingBox";
// import bgImage from '../img/hookah-bar-bg.png'
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
    <LoadingBox />
  ) : error ? (
    <Center>{error}</Center>
  ) : (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-around"
      w="100%"
      bg="#116D6E"
    >
      <Helmet>
        <title>דף הבית</title>
      </Helmet>

      <FormControl display="flex" justifyContent="center" alignItems="center">
        <Input
          dir="rtl"
          w="full"
          maxW={!isLargerThen768 ? "350px" : "600px"}
          type="text"
          mt="1rem"
          mb="3rem"
          bg="#321E1E"
          border="none"
          placeholder="חפש..."
          onChange={(e) => {
            setSerch(e.target.value);
          }}
        />
      </FormControl>

      {propertis
        .filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item.name.toLowerCase().includes(search);
        })
        .map((product) => (
          <Cards product={product} key={product.name}></Cards>
        ))}
    </Box>
  );
}

export default HomeFile;
