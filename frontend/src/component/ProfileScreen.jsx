import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import React, { useContext, useReducer, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormLabel,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
// import { toast, useToast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const toast = useToast();
  const { userInfo } = state;
  const navigate = useNavigate();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "עודכן בהצלחה",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
  };

  return (
    <Center h={{ base: "72vh", sm: "74vh" }} dir="rtl" bg="#393E46">
      <Helmet>
        <title>פרופיל</title>
      </Helmet>

      <Center
        border="1px solid black"
        borderRadius="20"
        w={{ base: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30" }}
        bg="#222831"
        color={"#EEEEEE"}
      >
        <form onSubmit={submitHandler}>
          <Text textAlign={"center"} fontSize="3xl">
            פרופיל
          </Text>

          <Box h="50vh" justifyContent="space-around">
            <FormLabel>שם</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <FormLabel>אימייל</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormLabel>סיסמה</FormLabel>
            <InputGroup
              border={"1px"}
              borderRadius={"lg"}
              borderColor={"gray.400"}
              alignItems="center"
            >
              <Input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                h="1.75rem"
                bg="none"
                _hover={"none"}
                size="sm"
                onClick={handleClick}
              >
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputGroup>
            <FormLabel>אשר סיסמה</FormLabel>
            <Input
              type={show ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Box mt="10%">
              <Button bg="#00ADB5" type="submit">
                עדכון
              </Button>
            </Box>
          </Box>
        </form>
      </Center>
    </Center>
  );
}

export default ProfileScreen;
