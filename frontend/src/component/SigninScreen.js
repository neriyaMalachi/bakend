import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Center>
        <Card
          bg="silver"
          h="60vh"
          w="60vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CardHeader
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="20%"
          >
            <Text fontSize="9xl" as="b">
              Sign In
            </Text>
          </CardHeader>

          <CardBody h="50%">
            <Text>Password</Text>
            <Input placeholder="password" type={"password"} required />

            <Text>Email</Text>
            <Input placeholder="Email" type={"email"} required />
          </CardBody>

          <CardFooter w="48%" h="20%"  display="flex" flexDirection="column" justifyContent="space-around">
            <Button bg="yellow" borderRadius="15%" p="1%" w="30%" type="submit">
              Sign In
            </Button>
            <Box w="130%" >
            New customer?{" "}<Link to={`/singup?redirect=${redirect}`}>Create your account</Link>

            </Box>
          </CardFooter>
        </Card>
      
      </Center>
      <Card >
     
      </Card>
    </>
  );
}

export default SigninScreen;
