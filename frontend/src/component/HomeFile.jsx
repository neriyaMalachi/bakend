import { Box, Center, GridItem, Grid, VStack, Select } from "@chakra-ui/react";
import { useReducer, useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import Search from "./Searchfile";

// Reducer function
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
// Components for loading, error, and property list
const LoadingComponent = () => (
  <Grid>
    <GridItem
      bg="#393E46"
      h="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <HashLoader color="#00ADB5" />
    </GridItem>
  </Grid>
);
const ErrorComponent = ({ error }) => <Center>{error}</Center>;

const PropertyList = ({ properties, search }) => {
  const filteredProperties = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return properties.filter((item) =>
      lowerSearch === "" ? item : item.name.toLowerCase().includes(lowerSearch)
    );
  }, [properties, search]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-evenly"
      minH="70vh"
    >
      {filteredProperties.map((product) => (
        <Cards product={product} key={product.slug} />
      ))}
    </Box>
  );
};

function HomeFile() {
  const [{ loading, error, propertis }, dispatch] = useReducer(reducer, {
    propertis: [],
    loading: true,
    error: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/propertis");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <Box bg="#393E46">
      <Helmet>
        <title>דף הבית</title>
      </Helmet>
      <VStack p="1%">
        <Search handleSearch={setSearch} />
      
      </VStack>
      <PropertyList properties={propertis} search={search} />
    </Box>
  );
}

export default HomeFile;
