import {
  Alert,
  AlertIcon,
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";


function ForgetPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationPassword, setValidationPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [maxWidthforHamborger] = useMediaQuery("(min-width:678px)");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);


  const handleChangePassword = async () => {
    if (password === validationPassword && password.length > 3) {
      try {
        // Send a request to your server to update the password
        const response = await fetch('/api/users/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, email }),
        });

        const data = await response.json();

        if (response.status === 200) {
          setMessage('Password updated successfully.');
          navigate("/signin")
        } else {
          setMessage(data.message || 'Password update failed.');
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    } else {
      setMessage(true);
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const { data } = await Axios.post("/api/users/forgetPassword", {
        email,

      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  return (
    <>

      {!success ? (
        <>
          <Helmet>
            <title>שכחתי סיסמה</title>

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
                  h="30%"
                >

                  <Text fontSize="3xl" as="b">
                    איפוס סיסמה
                  </Text>
                </CardHeader>

                <CardBody >
                  <Text>הכנס אימיל</Text>
                  <Input
                    placeholder="אימיל"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error === true && (
                    <Text color={"red.600"}>
                      
                      בעיה באימיל !
                    </Text>

                  )}
                </CardBody>
                <CardFooter
                  w="100%"
                  h="30%"
                  display="flex"
                  justifyContent="center"
                >
                  <Button type="submit" bg="#00ADB5" p="1%" w="40%">
                    החל
                  </Button>
                </CardFooter>
              </Card>
            </Center>
          </form>
        </>
      ) : (
        <>
          <Helmet>
            <title>איפוס סיסמה</title>

          </Helmet>

          <Center h="90vh" bg="#393E46">
            <Card
              color="#EEEEEE"
              h="60vh"
              w="60vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10%"
              dir="rtl"
              bg="#222831"
            >
              <CardHeader
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="20%"
              >
                <Text fontSize="3xl" as="b">
                  אפס
                </Text>
              </CardHeader>

              <CardBody h="50%">



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
                    border={"none"}
                    // value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button h="1.75rem" bg="none" _hover={"none"} size="sm" onClick={handleClick}>
                    {show ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>

                </InputGroup>

                <Text>אימות סיסמה</Text>
                <InputGroup
                  border={"1px"}
                  borderRadius={"lg"}
                  borderColor={"gray.400"}
                  alignItems="center"
                >
                  <Input
                    placeholder="אימות סיסמה"
                    type={show ? "text" : "password"}
                    required
                    onChange={(e) => setValidationPassword(e.target.value)}
                    border="none"
                  />



                </InputGroup>
                {message === true && (
                  <Alert dir="rtl" status='error'>
                    <AlertIcon />
                    בעיה בסיסמה!
                  </Alert>
                )}
              </CardBody>

              <CardFooter
                w="90%"
                h="30%"
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Button onClick={handleChangePassword} bg="#00ADB5" _hover={"none"} p="1%" w="40%">
                  אפס
                </Button>

              </CardFooter>
            </Card>
          </Center>
        </>

      )}

    </>
  );
}

export default ForgetPassword;
