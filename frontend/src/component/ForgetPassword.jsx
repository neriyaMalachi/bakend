import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function ForgetPassword() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maxWidthforHamborger] = useMediaQuery("(min-width:678px)");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
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
        <title>ForgetPassword</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center h="90vh" bg="blackAlpha.200">
          <Card
            color="white"
            h="60vh"
            w="60vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={maxWidthforHamborger ? "1px solid" : "none"}
            borderRadius="20%"
          >
            <CardHeader
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="20%"
            >
              <Text fontSize="3xl" as="b">
                Forget Password
              </Text>
            </CardHeader>

            <CardBody h="50%">
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
              <Button type="submit" bg="silver" p="1%" w="40%">
                submit
              </Button>
            </CardFooter>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default ForgetPassword;
