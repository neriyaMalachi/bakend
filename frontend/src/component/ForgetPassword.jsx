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
      // toast.error(" email invalid");
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
        <Center dir="rtl" h="90vh" bg="#393E46">
          <Card
            color="#EEEEEE"
            bg="#222831"
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
              justifyContent="center"
              h="50%"
            >
         
              <Text fontSize="3xl" as="b">
                איפוס סיסמה
              </Text>
            </CardHeader>

            <CardBody h="50%">
              <Text>הכנס אימיל</Text>
              <Input
                placeholder="אימיל"
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
              <Button type="submit" bg="#00ADB5" p="1%" w="40%">
                המשך
              </Button>
            </CardFooter>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default ForgetPassword;
