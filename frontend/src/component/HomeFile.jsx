import { useReducer, useEffect } from "react";
import { Box,Center } from "@chakra-ui/react";
import axios from "axios";
import Cards from "./Cards";
import { Helmet } from "react-helmet-async";
import LoadingBox from "./LoadingBox";

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
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/propertis");
        console.log(result.data);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setPropertis(result.data);
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox/>
  ) : error ? (
    <Center>{error}</Center>
  ) : (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-around"
      bg="whitesmoke"
      // p="3%"
      // h="100vh"
    >
      <Helmet>
        <title>Home page</title>
      </Helmet>

      {propertis.map((product) => (
        <Cards product={product} key={product.name}></Cards>
      ))}
    </Box>
  );
}

export default HomeFile;
