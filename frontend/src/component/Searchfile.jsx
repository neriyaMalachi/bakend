import { Input, InputGroup, InputLeftElement, useMediaQuery } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react';

const Search = ({ handleSearch }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <InputGroup
      w="full"
      maxW={!isLargerThan768 ? "350px" : "600px"}
      mx="auto"
      bg="#222831"
      borderRadius="md"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="#00ADB5" />
      </InputLeftElement>
      <Input
        dir="rtl"
        type="text"
        color="#EEEEEE"
        bg="transparent"
        border="none"
        placeholder="חפש..."
        _placeholder={{ color: "#888" }}
        onChange={(e) => handleSearch(e.target.value)}
        _focus={{ boxShadow: "outline" }}
      />
    </InputGroup>
  );
};

export default Search;
