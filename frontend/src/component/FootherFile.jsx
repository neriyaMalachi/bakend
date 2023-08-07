import {
  background,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Media from "react-media";
import imageForLogo from "../img/logoForTheProject.png";
function FootherFile() {
  return (
    <Media query="(min-width: 900px)">
      {(matches) => {
        return matches ? (
          <Box bg="#321E1E" bottom={0}>
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
              >
                <Flex
                  direction="column"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Image
                    borderRadius="50%"
                    w="70%"
                    h="80%"
                    src={imageForLogo}
                    alt="LOGO FOR COMPONY"
                  />
                </Flex>
              </GridItem>
              <GridItem
                colSpan={4}
                bg="#321E1E"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Divider orientation="vertical" h="60%" />

                <Button bg="#321E1E" color="white" _hover={"none"}>
                  יצירת קשר
                </Button>
                <Divider orientation="vertical" h="60%" />
                <Button bg="#321E1E" color="white" _hover={"none"}>
                  תקנון
                </Button>
                <Divider orientation="vertical" h="60%" />
                <Button bg="#321E1E" color="white" _hover={"none"}>
                  משלוחים והחזרות
                </Button>
                <Divider orientation="vertical" h="60%" />
                <Button bg="#321E1E" color="white" _hover={"none"}>
                  אדות
                </Button>
                <Divider orientation="vertical" h="60%" />
              </GridItem>
              <GridItem colSpan={2}></GridItem>
              <GridItem colSpan={2}>
                <Flex
                  alignItems="center"
                  h="60px"
                  w="60%"
                  justifyContent="space-around"
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
          </Box>
        ) : (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            bg="#321E1E"
            w="100%"
            h="300px"
          >
            <Flex
              direction="column"
              w="40%"
              h="50%"
              justifyContent="space-around"
            >
              <Button mt="3%" bg="none" color="white" _hover={"none"}>
                יצירת קשר
              </Button>
              <Button mt="3%" bg="none" color="white" _hover={"none"}>
                תקנון
              </Button>

              <Button mt="3%" bg="none" color="white" _hover={"none"}>
                משלוחים והחזרות
              </Button>

              <Button mt="3%" bg="none" color="white" _hover={"none"}>
                אדות
              </Button>
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              h="100px"
              w="60%"
              color="white"
            >
              <Box>
                <BsFacebook size={25} />
              </Box>
              
              <Box>
                <a href="https://api.whatsapp.com/send?phone=972585202271&text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%AA%D7%95%D7%9B%D7%9C%D7%95%20%D7%9C%D7%99%D7%A6%D7%95%D7%A8%20%D7%90%D7%99%D7%AA%D7%99%20%D7%A7%D7%A9%D7%A8%20%D7%91%D7%94%D7%A7%D7%93%D7%9D%20%D7%94%D7%90%D7%A4%D7%A9%D7%A8%D7%99">
                <FaWhatsapp size={25} />
                </a>
              </Box>
              <Box>
                <AiFillLinkedin size={25} />
              </Box>

           
              <Box>
              <HiOutlineMail size={30} />
              </Box>
            </Flex>
         
          </Flex>
        );
      }}
    </Media>
  );
}

export default FootherFile;
