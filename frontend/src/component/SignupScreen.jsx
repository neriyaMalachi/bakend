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


function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
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
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/Home");
    } catch (err) {
      console.log("password or email invalid");
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
        <Center h="80vh" bg="#393E46">
          <Card
            color="#EEEEEE"
            bg={"#222831"}
            h="50vh"
            w="50vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={maxWidthforHamborger ? "10%" : "none"}
            dir="rtl"
          >
            <CardHeader display="flex" justifyContent="center" w="100%">
              <Text fontSize="3xl" as="b">
                הירשם
              </Text>
            </CardHeader>

            <CardBody  >
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
              <InputGroup
                border={"1px"}
                borderRadius={"lg"}
                borderColor={"gray.400"}
                alignItems="center"
              >
              <Input
                placeholder="סיסמה"
                type={show ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button h="1.75rem" bg="none" size="sm" onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
              </InputGroup>
              <Text>אמת סיסמה</Text>
              <Input
                placeholder="אמת סיסמה"
                type={show ? "text" : "password"}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" bg="#00ADB5" p="1%" w="30%" mt="5%">
                הירשם
              </Button>
            </CardBody>

            <CardFooter
              w="90%"
              h="25%"
              display="flex"
              justifyContent="center"

            >
            <Box >
              יש לך כבר חשבון?{" "}
              <Link to={`/?redirect=${redirect}`}>
                <Text as="u">התחבר</Text>{" "}
              </Link>
            </Box>
            </CardFooter>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default SignupScreen;
