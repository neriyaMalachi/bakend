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
        <Center h="90vh" bg="#00ADB5">
          <Card
            color="#EEEEEE"
            bg={"#222831"}
            h="65vh"
            w="60vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={maxWidthforHamborger ? "1px solid" : "none"}
            borderRadius={maxWidthforHamborger ? "20%" : "none"}
            dir="rtl"
          >
            <CardHeader display="flex" justifyContent="center" h="5%" w="100%">
              <Text fontSize="3xl" as="b">
                הירשם
              </Text>
            </CardHeader>

            <CardBody h="60%">
              <Text>שם</Text>
              <Input
                placeholder="שם"
                type="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Text>איימיל</Text>
              <Input
                placeholder="איימיל"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Text>סיסמה</Text>
              <Input
                placeholder="סיסמה"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <Text>אמת סיסמה</Text>
              <Input
                placeholder="אמת סיסמה"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" bg="#393E46" _hover={"none"} p="1%" w="30%" mt="5%">
                הירשם
              </Button>
            </CardBody>

            <CardFooter
              w="90%"
              h="25%"
              display="flex"
              justifyContent="center"
              
            ></CardFooter>
            <Box  >
              יש לך כבר חשבון?{" "}
              <Link to={`/signin?redirect=${redirect}`}>
                <Text as="u">התחבר</Text>{" "}
              </Link>
            </Box>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default SignupScreen;
