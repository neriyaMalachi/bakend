import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

const Search = ({ handleSearch }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
 
  return (
    <>
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
      <Select
        placeholder="בחר קטגוריה"
        bg="#222831"
        color="silver"
        onChange={(e) => handleSearch(e.target.value)}
        w="40%"
       textAlign={"center"}
      >
        <option value="נרגילה">נרגילות</option>
        <option value="ראש">ראשים</option>
        <option value="טבק">טבק</option>
        <option value="גחלים">גחלים</option>
        <option value="צינור">צינורות</option>
        <option value="מלקחיים">מלקחיים</option>
        <option value="כד">כדים</option>




      </Select>
    </>
  );
};

export default Search;
