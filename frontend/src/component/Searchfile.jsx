import { Input, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

const Search = ({ handleSearch }) => {
  const [isLargerThen768] = useMediaQuery("(min-width: 768px)");

    return (
        <Input
            dir="rtl"
            w="full"
            maxW={!isLargerThen768 ? "350px" : "600px"}
            type="text"
            color="#EEEEEE"
            bg="#222831"
            border="none"
            placeholder="חפש..."
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
};

export default Search;