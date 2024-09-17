import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import imageForLogo from "../img/logoNargilaStor.png";
import { Link } from "react-router-dom";

function FooterFile() {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Box
      bg="#222831"
      color="#00ADB5"
      py={{ base: 4, lg: 8 }}
      px={{ base: 2, lg: 10 }}
      textAlign="center"
    >
      {isLargeScreen ? (
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              w="70%"
              h="80%"
              src={imageForLogo}
              alt="LOGO FOR COMPANY"
            />
          </GridItem>
          <GridItem
            colSpan={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            gridRow="1 / span 1"
          >
            <Button variant="link" _hover={{ color: "white" }}>
              יצירת קשר
            </Button>
            <Divider orientation="vertical" h="60%" borderColor="#00ADB5" />
            <Button variant="link" _hover={{ color: "white" }}>
              תקנון
            </Button>
            <Divider orientation="vertical" h="60%" borderColor="#00ADB5" />
            <Button variant="link" _hover={{ color: "white" }}>
              משלוחים והחזרות
            </Button>
            <Divider orientation="vertical" h="60%" borderColor="#00ADB5" />
            <Button variant="link" _hover={{ color: "white" }}>
              אודות
            </Button>
          </GridItem>
          <GridItem colSpan={5} display="flex" justifyContent="center" mt={4}>
            <Flex
              alignItems="center"
              justifyContent="space-around"
              maxW="400px"
              w="full"
              color="white"
            >
              <HiOutlineMail size={30} />
              <BsFacebook size={25} />
              <FaTwitter size={25} />
              <a href="https://api.whatsapp.com/send?phone=972585202271&text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%AA%D7%95%D7%9B%D7%9C%D7%95%20%D7%9C%D7%99%D7%A6%D7%95%D7%A8%20%D7%90%D7%99%D7%AA%D7%99%20%D7%A7%D7%A9%D7%A8%20%D7%91%D7%94%D7%A7%D7%93%D7%9D%20%D7%94%D7%90%D7%A4%D7%A9%D7%A8%D7%99">
                <FaWhatsapp size={30} />
              </a>
            </Flex>
          </GridItem>
        </Grid>
      ) : (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          h="auto"
        >
          <Flex
            direction="column"
            w="80%"
            maxW="500px"
            mb={4}
            alignItems="center"
            textAlign="center"
          >
            <Image
              src={imageForLogo}
              alt="LOGO FOR COMPANY"
              boxSize="150px"
              mb={4}
            />
            <Button variant="link" _hover={{ color: "white" }}>
              יצירת קשר
            </Button>
            <Button variant="link" _hover={{ color: "white" }}>
              תקנון
            </Button>
            <Button variant="link" _hover={{ color: "white" }}>
              משלוחים והחזרות
            </Button>
            <Button variant="link" _hover={{ color: "white" }}>
              אודות
            </Button>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-around"
            color="white"
            mb={4}
          >
            <HiOutlineMail size={30} />
            <BsFacebook size={25} mx={2} />
            <FaTwitter size={25} mx={2} />
            <a href="https://api.whatsapp.com/send?phone=972585202271&text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%AA%D7%95%D7%9B%D7%9C%D7%95%20%D7%9C%D7%99%D7%A6%D7%95%D7%A8%20%D7%90%D7%99%D7%AA%D7%99%20%D7%A7%D7%A9%D7%A8%20%D7%91%D7%94%D7%A7%D7%93%D7%9D%20%D7%94%D7%90%D7%A4%D7%A9%D7%A8%D7%99">
              <FaWhatsapp size={30} />
            </a>
            <AiFillLinkedin size={25} mx={2} />
          </Flex>
          
          <Link to="https://nm-ambition.com/" color="white" fontSize="sm">
          © 2024 N.M AMBITION  האתר נבנה על ידי חברת 
          </Link>
        </Flex>
      )}
    </Box>
  );
}

export default FooterFile;
