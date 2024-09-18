import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Input,
  InputGroup,
  InputProps,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationPassword, setValidationPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleChangePassword = async () => {
    if (password === validationPassword && password.length > 3) {
      try {
        const response = await fetch("/api/users/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, email }),
        });

        const data = await response.json();

        if (response.status === 200) {
          setMessage("Password updated successfully.");
          navigate("/");
        } else {
          setMessage(data.message || "Password update failed.");
        }
      } catch (error) {
        console.error("Error updating password:", error);
      }
    } else {
      setMessage(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/api/users/forgetPassword", { email });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  const CardStyles = {
    color: "#EEEEEE",
    bg: "#222831",
    borderRadius: "lg",
    maxW: "md",
    w: "90%",
    p: 4,
    boxShadow: "md",
  };

  return (
    <>
      <Helmet>
        <title>{success ? "איפוס סיסמה" : "שכחתי סיסמה"}</title>
      </Helmet>
      <Center h="100vh" bg="#393E46" dir="rtl">
        <Card {...CardStyles}>
          {success ? (
            <>
              <CardHeader>
                <Text fontSize="2xl" as="b">
                  אפס סיסמה
                </Text>
              </CardHeader>
              <CardBody>
                <Text mb={2}>סיסמה חדשה</Text>
                <InputGroup mb={4}>
                  <Input
                    placeholder="סיסמה"
                    type={show ? "text" : "password"}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    h="1.75rem"
                    bg="none"
                    _hover={{ bg: "none" }}
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputGroup>

                <Text mb={2}>אימות סיסמה</Text>
                <InputGroup mb={4}>
                  <Input
                    placeholder="אימות סיסמה"
                    type={show ? "text" : "password"}
                    required
                    onChange={(e) => setValidationPassword(e.target.value)}
                  />
                </InputGroup>

                {message && (
                  <Alert status="error">
                    <AlertIcon />
                    בעיה בסיסמה!
                  </Alert>
                )}
              </CardBody>
              <CardFooter>
                <Button
                  onClick={handleChangePassword}
                  bg="#00ADB5"
                  _hover={{ bg: "#00A1A7" }}
                  w="full"
                >
                  אפס
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <Text fontSize="2xl" as="b">
                  איפוס סיסמה
                </Text>
              </CardHeader>
              <CardBody>
                <Text mb={2}>הכנס אימיל</Text>
                <Input
                  placeholder="אימיל"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && (
                  <Text color="red.600" mt={2}>
                    בעיה באימיל !
                  </Text>
                )}
              </CardBody>
              <CardFooter>
                <Button
                  onClick={submitHandler}
                  bg="#00ADB5"
                  _hover={{ bg: "#00A1A7" }}
                  w="full"
                >
                  החל
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </Center>
    </>
  );
}

export default ForgetPassword;
