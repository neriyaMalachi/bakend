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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
function SigninScreen() {
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
            dir="rtl"
          >
            <CardHeader
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="20%"
            >
              <Text fontSize="3xl" as="b">
                התחברות
              </Text>
            </CardHeader>

            <CardBody h="50%">
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
                  border="none"
                />
                {/* <InputLeftElement> */}
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                {/* </InputLeftElement> */}
              </InputGroup>
              <Link to="/forgetPassword">שכחתי סיסמה?</Link>
            </CardBody>

            <CardFooter
              w="90%"
              h="30%"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <Button type="submit" bg="silver" p="1%" w="40%">
                התחבר
              </Button>
              <Box alignItems="end">
                לקוח חדש?{" "}
                <Link to={`/signup?redirect=${redirect}`}>
                  <Text as="u">צור משתמש חדש</Text>
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
