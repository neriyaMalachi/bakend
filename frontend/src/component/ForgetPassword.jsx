import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Image,
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
import imageForLogo from "../img/logoNargilaStor.png";


function ForgetPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [maxWidthforHamborger] = useMediaQuery("(min-width:678px)");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
console.log(email);
    try {
      const {data}  = await Axios.post("/api/users/forgetPassword", {
        email,
      });
      console.log(email);

      console.log({data} );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(" email invalid");
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
            color="black"
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
              flexDirection="column"
              // alignItems="center"
              justifyContent="center"
              h="50%"
            >
         
              <Text fontSize="3xl" as="b">
                Forget Password
              </Text>
            </CardHeader>

            <CardBody h="50%">
              <Text>enter your email address</Text>
              <Input
                placeholder="Email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardBody>
            <CardFooter
              w="100%"
              h="30%"
              display="flex"
              justifyContent="center"
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
