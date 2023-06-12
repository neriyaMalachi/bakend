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
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Store } from "../Store";
import { useEffect } from "react";
import { toast } from "react-toastify";

function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [maxWidthforHamborger] = useMediaQuery("(min-width:678px)");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      // console.log({ data });
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
        <title>Sign Up</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center  h="90vh" bg="blackAlpha.200" >
          <Card
            color="white"
            h="60vh"
            w="60vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={maxWidthforHamborger ? "1px solid" : "none"}
            borderRadius={maxWidthforHamborger ? "20%" : "none"}
          >
            <CardHeader display="flex" justifyContent="center" h="5%" w="100%">
              <Text fontSize="3xl" as="b">
                Sign Up
              </Text>
            </CardHeader>

            <CardBody h="60%">
              <Text>Name</Text>
              <Input
                placeholder="name"
                type="name"
                required
                onChange={(e) => setName(e.target.value)}
              />

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
              <Text>Confim Password</Text>
              <Input
                placeholder="Confirm Password"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" bg="silver" p="1%" w="30%" mt="5%">
                הירשם
              </Button>
            </CardBody>

            <CardFooter
              w="90%"
              h="25%"
              display="flex"
              justifyContent="center"
            ></CardFooter>
            <Box>
              יש לך כבר חשבון?{" "}
              <Link to={`/signin?redirect=${redirect}`}><Text as="u" >התחבר</Text> </Link>
            </Box>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default SignupScreen;
