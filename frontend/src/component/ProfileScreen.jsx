import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { useContext, useReducer, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";

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
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      toast.success("User updated successfully");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
  };

  return (
    <Center>
      <Helmet>
        <title>User Profile</title>
      </Helmet>

      <Center
      mt="2%"
        border="1px solid"
        borderRadius="10%"
        w="30%"
        h={{ base: "82vh", sm: "84vh" }}
      >
        <form onSubmit={submitHandler}>
        <Text m="5%" fontSize="3xl">User Profile</Text>

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
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <FormLabel>אשר סיסמה</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Box mt="10%">
              <Button type="submit">עדכון</Button>
            </Box>
          </Box>
        </form>
      </Center>
    </Center>
  );
}

export default ProfileScreen;
