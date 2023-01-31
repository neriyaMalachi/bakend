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
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Store } from "../Store";
import { useEffect } from "react";
import { toast } from "react-toastify";

function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      console.log({ data });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error("password or email invalid");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center h="90vh"  bg="whitesmoke">
          <Card
          h="60vh"
          w="60vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px solid"
          borderRadius="20%"
          >
            <CardHeader
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="20%"
            >
              <Text fontSize="3xl" as="b"  >
                Sign In
              </Text>
            </CardHeader>

            <CardBody h="50%">
              <Text>Password</Text>
              <Input
                placeholder="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <Text>Email</Text>
              <Input
                placeholder="Email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardBody>

            <CardFooter
              w="90%"
              h="30%"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <Button
                type="submit"
                bg="chartreuse"
                borderRadius="15%"
                p="1%"
                w="40%"
              >
                Sign In
              </Button>
              <Box  w="200%" alignItems="end" >
                New customer?{" "}
                <Link to={`/signup?redirect=${redirect}`}>
                  Create your account
                </Link>
              </Box>
            </CardFooter>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default SigninScreen;
