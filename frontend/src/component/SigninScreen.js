import { Button, Card, CardBody, CardFooter, CardHeader, Center, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet-async";

function SigninScreen() {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
<Center>
      <Card bg="silver" h="60vh" w="60vh" >
        <CardHeader display="flex" alignItems="center" justifyContent="center" h="20%">
            <Text fontSize="3xl" as='b'>Sign In</Text>
        </CardHeader>

        <CardBody bg="yellow" display="flex" justifyContent="space-between"  >
        <InputGroup size='md'>
      <Input placeholder='password'/>
      <Input placeholder='Email'/>
    </InputGroup>
        </CardBody>

        <CardFooter></CardFooter>
      </Card>
      </Center>
    </>
  );
}

export default SigninScreen;
