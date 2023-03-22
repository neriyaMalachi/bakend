import {
  background,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import Media from "react-media";
import imageForLogo from "../img/logoForTheProject.png";
function FootherFile() {
  return (
    <Media query="(min-width: 900px)">
      {(matches) => {
        return matches ? (
          <Box bg="black"  mt="2%"  bottom={0}>
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
                bg="black"
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
                bg="black"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Divider orientation="vertical" h="60%" />

                <Button bg="black" color="white" _hover={"none"}>
                  יצירת קשר
                </Button>
                <Divider orientation="vertical" h="60%" />
                <Button bg="black" color="white" _hover={"none"}>
                  תקנון
                </Button>
                <Divider orientation="vertical" h="60%" />
                <Button bg="black" color="white" _hover={"none"}>
                  משלוחים והחזרות
                </Button>
                <Divider orientation="vertical" h="60%" />
                <Button bg="black" color="white" _hover={"none"}>
                  אדות
                </Button>
                <Divider orientation="vertical" h="60%" />
              </GridItem>
              <GridItem
                colSpan={3}
                color="white"
                display="flex"
                alignItems="end"
                justifyContent="space-around"
              >
                <Text fontSize={"xl"}>Email: neriyaMalachi@gmail.com </Text>
                <Text fontSize={"xl"}> WhatsApp: 0585202271 </Text>
              </GridItem>
              <GridItem colSpan={1} bg="black">
                <Flex
                  alignItems="center"
                  h="60px"
                  w="90%"
                  justifyContent="space-around"
                >
                  <BsFacebook size={25} />
                  <BsInstagram size={25} />
                  <AiFillLinkedin size={25} />
                  <FaTwitter size={25} />
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        ) : (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            bg="black"
            w="100%"
            h="300px"
            mt="20%"
          >
            <Flex
              direction="column"
              w="40%"
              h="50%"
              justifyContent="space-around"
            >
              <Button mt="3%" bg="black" color="white" _hover={"none"}>
                יצירת קשר
              </Button>
              <Button mt="3%" bg="black" color="white" _hover={"none"}>
                תקנון
              </Button>

              <Button mt="3%" bg="black" color="white" _hover={"none"}>
                משלוחים והחזרות
              </Button>

              <Button mt="3%" bg="black" color="white" _hover={"none"}>
                אדות
              </Button>
            </Flex>
            <Flex
              justifyContent="space-around"
              alignItems="center"
              h="100px"
              w="50%"
            >
              <Box>
                <BsFacebook size={25} />
              </Box>
              <Box>
                <BsInstagram size={25} />
              </Box>

              <Box>
                <AiFillLinkedin size={25} />
              </Box>

              <Box>
                <FaTwitter size={25} />
              </Box>
            </Flex>
            <Flex
              w="full"
              color="white"
              direction="column"
              p="3%"
              alignItems="center"
            >
              <Text fontSize={"xl"}>Email: neriyaMalachi@gmail.com </Text>
              <Text fontSize={"xl"}> WhatsApp: 0585202271 </Text>
            </Flex>
          
        
          </Flex>
        );
      }}
    </Media>
  );
}

export default FootherFile;
