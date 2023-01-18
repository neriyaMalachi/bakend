import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet-async";

function SigninScreen() {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <Card>
        <CardHeader>
            <Text fontSize="3xl" as='b'>Sign In</Text>
        </CardHeader>

        <CardBody></CardBody>

        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default SigninScreen;
