import {
  Box,
  Button,
  Card,
  CardFooter,
  Input,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import  useState  from "react";
import { Helmet } from "react-helmet-async";
import { Form } from "react-router-dom";

function shippingAddressScreen() {

  const [fullName, setFullName] = useState(" ");
  const [address, setAddress] = useState("");
  const [city, setCity]=useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setcountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Card>
      <Helmet>
        <title>Shiping Address</title>
      </Helmet>
      <Form onSubmit={submitHandler}>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >

          <Box h="40px" bg="yellow.200">
            <Input
              placeholder="Full name"
              size="lg"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Box>

          <Box h="40px" bg="tomato">
            <Input
              placeholder="Address"
              size="lg"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>

          <Box h="40px" bg="pink.100">
            <Input
              placeholder="City"
              size="lg"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>

          <Box h="40px" bg="pink.100">
            <Input
              placeholder="Postal code"
              size="lg"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Box>

          <Box h="40px" bg="pink.100">
            <Input
              placeholder="Country"
              size="lg"
              value={country}
              required
              onChange={(e) => setcountry(e.target.value)}
            />
          </Box>
        </VStack>
      </Form>

      <CardFooter>
        <Button variant="primary" type="submit">
          התחבר
        </Button>
      </CardFooter>
    </Card>
  );
}

export default shippingAddressScreen;
