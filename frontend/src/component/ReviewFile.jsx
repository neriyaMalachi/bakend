import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { StarIcon } from "@chakra-ui/icons";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

function ReviewFile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [items, setItems] = useState([]);
  const [userPutInReview, setUserPutInReview] = useState(false);
  const toast = useToast();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const user = state.userInfo.name;
  const email = state.userInfo.email;

  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = async () => {
    fetch("http://localhost:5000/api/reviews", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  };
  const check = async () => {
    const res = await axios.post("/api/reviews/checkIfUserInputReview", {
      email,
    });
    if (res.data) {
      setUserPutInReview(true);
    } else {
      setUserPutInReview(false);
    }
  };
  const AddReview = async () => {
    try {
      await axios.post("/api/reviews/addReview", {
        email,
        user,
        rating,
        review,
      });
      onClose();
      getReviews();
      setUserPutInReview(true);
    } catch {
      toast({
        title: "קיימת במערכת חוות דעת ממך",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    }
  };
  const checkEditReviewAccordingToUser = async (id, item) => {
    setReview(item);
    try {
      await axios.get("/api/reviews/checkIfExists", {
        email,
      });
      setUserPutInReview(true);
      onOpen();
    } catch (err) {
      console.log("err");
      setUserPutInReview(false);
    }
  };
  const editReview = async (item) => {
    let idForReview;

    items.filter((edit) => {
      return edit.email === email ? (idForReview = edit._id) : <></>;
    });

    await fetch(
      `http://localhost:3000/api/reviews/editeReview/${idForReview}`,
      {
        method: "put",
        body: JSON.stringify({
          review,
          rating,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    getReviews();
    onClose();
  };
  const deletereview = async (id) => {
    await fetch(`http://localhost:3000/api/reviews/deleteReview/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        setUserPutInReview(false);
        setRating(null);
        getReviews();
        console.log(userPutInReview);
      });
    });
  };

  return (
    <Box color={"white"}>
    <ModalCloseButton />
    <Text m="5%" textAlign="center" fontSize="xx-large">
      ביקורות
    </Text>
    <Flex alignItems="center" justifyContent="center" direction="column">
      {items.length === 0 ? (
        <Text mt="5%">אין ביקורות להצגה</Text>
      ) : (
        items
          .filter((item) => item.email === email)
          .map((item, index) => (
            <Card
              mt="1%"
              key={index}
              minH="400px"
              h="200px"
              minW="150px"
              w="300px"
              dir="rtl"
              bg="#222831"
              color="white"
            >
              <CardHeader letterSpacing="1px" fontSize="lg">
                <Avatar size="sm" name={item.user} src={item.avatar || "https://bit.ly/broken-link"} />
                השארת חוות דעת מ{item.user}:
                <Divider />
              </CardHeader>
              <CardBody>{item.review}</CardBody>
              <CardFooter display="flex" justifyContent="space-between">
                <Flex alignItems="end">
                  {Array(item.rating)
                    .fill("")
                    .map((star, i) => (
                      <StarIcon ml="5%" key={i} color="yellow" />
                    ))}
                </Flex>
                <Flex >
                  {item.user === user && item.email === email && (
                    <>
                      <IconButton color="white" bg="none" onClick={() => checkEditReviewAccordingToUser(item._id, item.review)}>
                        <BiEditAlt />
                      </IconButton>
                      <IconButton color="white" bg="none" onClick={() => deletereview(item._id)}>
                        <MdOutlineDelete />
                      </IconButton>
                    </>
                  )}
                </Flex>
              </CardFooter>
            </Card>
          ))
      )}
      {!userPutInReview && (
        <Button mt="3" onClick={onOpen}>
          הוסף ביקורת
        </Button>
      )}
    </Flex>
  
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader dir="rtl">{userPutInReview ? "עדכון חוות דעת" : "הוסף ביקורת"}</ModalHeader>
        <ModalBody>
          <Flex justifyContent="space-evenly" alignItems="center" direction="column">
            <Textarea
              dir="rtl"
              rows="10"
              cols="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder={userPutInReview ? "עדכן את חוות הדעת שלך" : "הוסף ביקורת"}
            />
            <Box>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label key={index}>
                    <Input
                      type="radio"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                      display="none"
                    />
                    <StarIcon
                      cursor="pointer"
                      color={currentRating <= (hover || rating) ? "yellow" : "silver"}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button bg="red.300" mr={3} onClick={onClose}>
            ביטול
          </Button>
          <Button bg="#00ADB5" onClick={userPutInReview ? () => editReview(state.userInfo._id) : AddReview}>
            {userPutInReview ? "עדכן" : "הוסף ביקורת"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  
    {/* הצגת ביקורות אחרות */}
    <Box
      mt="15%"
      minH="80vh"
      h="80vh"
      display="flex"
      flexWrap="wrap"
      justifyContent="space-evenly"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-track": { width: "6px" },
        "&::-webkit-scrollbar-thumb": { background: "#4E3636", borderRadius: "24px" },
      }}
    >
      {items
        .filter((item) => item.email !== email)
        .map((item, index) => (
          <Card mt="1%" key={index} minH="400px" h="200px" minW="150px" w="300px" dir="rtl" color="white" bg="#222831">
            <CardHeader letterSpacing="1px" fontSize="lg">
              <Avatar size="sm" name={item.user} src={item.avatar || "https://bit.ly/broken-link"} />
              השארת חוות דעת מ{item.user}:
              <Divider />
            </CardHeader>
            <CardBody>{item.review}</CardBody>
            <CardFooter display="flex" justifyContent="space-between">
              <Flex alignItems="end">
                {Array(item.rating)
                  .fill("")
                  .map((star, i) => (
                    <StarIcon ml="5%" key={i} color="yellow" />
                  ))}
              </Flex>
            </CardFooter>
          </Card>
        ))}
    </Box>
  </Box>
  
  );
}

export default ReviewFile;
