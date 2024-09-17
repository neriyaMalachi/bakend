import {
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
import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLargeScreen] = useMediaQuery("(min-width:678px)");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
      toast.error("Error signing up. Please try again.");
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
        <title>הירשם</title>
      </Helmet>

      <form onSubmit={submitHandler}>
        <Center h="80vh" bg="#393E46" dir="rtl">
          <Card
            color="#EEEEEE"
            bg="#222831"
            p={6}
            borderRadius={isLargeScreen ? "md" : "none"}
            maxW="lg"
            w="90%"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <CardHeader w="full" mb={4}>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                הירשם
              </Text>
            </CardHeader>

            <CardBody w="full">
              <Text mb={2}>שם</Text>
              <Input
                placeholder="שם"
                type="text"
                required
                mb={4}
                onChange={(e) => setName(e.target.value)}
              />
              <Text mb={2}>אימייל</Text>
              <Input
                placeholder="אימייל"
                type="email"
                required
                mb={4}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Text mb={2}>סיסמה</Text>
              <InputGroup mb={4}>
                <Input
                  placeholder="סיסמה"
                  type={show ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
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
              <Text mb={2}>אמת סיסמה</Text>
              <Input
                placeholder="אמת סיסמה"
                type={show ? "text" : "password"}
                required
                mb={4}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                bg="#00ADB5"
                color="white"
                _hover={{ bg: "#009a9e" }}
                w="full"
              >
                הירשם
              </Button>
            </CardBody>

            <CardFooter w="full" mt={4} textAlign="center">
              <Text>
                יש לך כבר חשבון?{" "}
                <Link to={`/?redirect=${redirect}`}>
                  <Text as="u" color="#00ADB5">התחבר</Text>
                </Link>
              </Text>
            </CardFooter>
          </Card>
        </Center>
      </form>
    </>
  );
}

export default SignupScreen;
