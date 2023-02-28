import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import imageForLogo from "../img/logoForTheProject.png";
function FootherFile() {
  return (
    <Flex
      bg="black"
      w="100%"
      h="300px"
      display="flex"
      alignItems="end"
      justifyContent="center"
      direction="column"
    >
      <Flex 
      color="white"
        h="50%"
        w="100%" 
        textAlign="center"
        direction="column"
        >

        <Box  fontStyle="oblique" fontSize="3xl">
       <strong  >  השאיפה שלי-</strong>
עם לקוחות מרוצים כבר חמש שנים בירציפות        </Box>
        <Box w="100%">
           חברתנו קיימת כבר מעל חמש שנים מוכרת ברחבי הארץ עם המלצות מכל הקונים{" "}
        </Box>
      </Flex>

      <Flex w="100%" h="20%" justifyContent="space-between">
        <Image
          borderRadius="50%"
          w="10%"
          h="150%"
          src={imageForLogo}
          alt="LOGO FOR COMPONY"
        />
        <Flex justifyContent="space-between" w="10%">
          <BsFacebook color="blue" size={35} />
          <BsInstagram color="red" size={35} />
        </Flex>
        <Button>יצירת קשר</Button>
        <Button>תקנון</Button>
        <Button>משלוחים והחזרות</Button>
        <Button>אדות</Button>
        <Box></Box>
      </Flex>
    </Flex>
  );
}

export default FootherFile;