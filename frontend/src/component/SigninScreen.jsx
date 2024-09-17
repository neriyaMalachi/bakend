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
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Store } from "../Store";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function SigninScreen() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/home";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", { email, password });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      setError(true);
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
        <title>התחברות</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center h="80vh" bg="#393E46" dir="rtl" >
          <Card
            color="#EEEEEE"
            bg="#222831"
            borderRadius="md"
            maxW={useBreakpointValue({ base: "90%", md: "50vh" })}
            minW="300px"
            p={6}
            boxShadow="lg"
          >
            <CardHeader
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <Text fontSize="2xl" fontWeight="bold">
                התחברות
              </Text>
            </CardHeader>

            <CardBody>
              <Text mb={2}>אימייל</Text>
              <Input
                placeholder="אימייל"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
              />

              <Text mb={2}>סיסמה</Text>
              <InputGroup>
                <Input
                  placeholder="סיסמה"
                  type={show ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  borderColor="gray.400"
                  borderRadius="md"
                />
                <Button
                  variant="link"
                  onClick={handleClick}
                  ml={-12}
                  mt={1}
                >
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputGroup>

              <Link to="/forgetPassword">
                <Text color="#00ADB5" mt={2}>שכחת סיסמה?</Text>
              </Link>

              {error && (
                <Text color="red.500" mt={2}>
                  בעיה בפרטי ההתחברות!
                </Text>
              )}
            </CardBody>

            <CardFooter
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={4}
            >
              <Button
                type="submit"
                bg="#00ADB5"
                _hover={{ bg: "#009a9e" }}
                color="white"
                w="full"
              >
                התחבר
              </Button>
              <Box textAlign="center" mt={4}>
                <Text>
                  לקוח חדש?{" "}
                  <Link to={`/signup?redirect=${redirect}`}>
                    <Text as="u" color="#00ADB5">צור משתמש חדש</Text>
                  </Link>
                </Text>
              </Box>
            </CardFooter>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default SigninScreen;
