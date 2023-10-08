import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, Stack, Text, Textarea, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from "../Store";
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from 'react-icons/bi';



function ReviewFile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [review, setReview] = useState();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [items, setItems] = useState([]);
  const [obg, setObg] = useState({});
  const [error, setError] = useState(null);
  const [userPutInReview, setUserPutInReview] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const user = state.userInfo.name;
  const email = state.userInfo.email;
  useEffect(() => {
    getReviews();
    // check();
  }, []);
  const getReviews = async() => {
    fetch("http://localhost:5000/api/reviews", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          setError(error);
        }
      );

      
  };
  const check = async () => {
    try {
      await axios.get("/api/reviews/checkIfExists", {
        email,
      });
      setUserPutInReview(true);

    } catch (err) {

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
    } catch (err) {
      toast({
        title: 'קיימת במערכת חוות דעת ממך',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      onClose();
    }
  }
  const checkEditReviewAccordingToUser = async (item) => {
    setReview(item)
    setObg(item)
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
    console.log(obg);

  }
  const chenghReview = async (item) => {
    let result = await fetch(
      `http://localhost:3000/api/reviews/editeReview/${obg._id}`,
      {
        method: "put",
        body: JSON.stringify({
          review,
          rating,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      })
    result = await result.json();
    getReviews()
    onClose()
  }
  return (

    <Box >
      <Text m="5%" textAlign={"center"} fontSize={"xx-large"}>ביקורות</Text>
      <Flex justifyContent={"center"}>
        {userPutInReview === true ? (

          items
            .filter((item) => {
              return item.email === email ? item : !item
            }).map((item, index) => (

              <Card mt="1%" key={index} minH={"400px"} h="200px" minW={"150px"} w="300px" dir="rtl" bg="#222831" >
                <CardHeader letterSpacing={"1px"} fontSize={"lg"} >
                  <Avatar size="sm" name={item.user} src='https://bit.ly/broken-link' />
                  {" "}
                  השארת חוות דעת מ
                  {item.user}:
                  <Divider />
                  {item.createdAt}
                </CardHeader>
                <CardBody>


                  {item.review}
                </CardBody>
                <CardFooter display={"flex"} justifyContent={"space-between"}>
                  <Flex alignItems={"end"}   >
                    {Array(item.rating).fill("")
                      .map((star, i) => (
                        <StarIcon
                          ml="5%"
                          key={i}
                          color="yellow"
                        />
                      ))}
                  </Flex>
                  <Flex >
                    {item.user === user && item.email === email ? (
                      <IconButton bg="none" onClick={() => { checkEditReviewAccordingToUser(item) }}>
                        <BiEditAlt />
                      </IconButton>
                    ) : (<></>)
                    }
                  </Flex>

                </CardFooter>
              </Card>


            ))

        ) : (<Button onClick={onOpen} >הוסף ביקורת</Button>)}

      </Flex>
      <Box
        mt="15%"
        minH={"80vh"}
        h="80vh"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-evenly"
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#4E3636",
            borderRadius: "24px",
          },
        }}
      >

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          {userPutInReview ? (
            <ModalContent>
              <ModalHeader dir='rtl'>עידכון חוות דעת</ModalHeader>
              <Flex
                justifyContent="space-evenly"
                alignItems="center"
                direction="column"
              >
                <Textarea
                  dir="rtl"
                  type='reviewText'
                  rows="10"
                  cols="5"
                  value={review.review}
                  onChange={(e) => { setReview(e.target.value) }}
                />
                <Box>
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1
                    return (
                      <label key={index}>
                        <Input
                          type='radio'
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          display={"none"}
                        />
                        <StarIcon
                          cursor={"pointer"}
                          color={currentRating <= (hover || rating) ? "yellow" : "silver"}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </Box>

              </Flex>
              <ModalFooter>
                <Button bg='red.300' mr={3} onClick={onClose}>
                  ביטול
                </Button>
                <Button bg='#00ADB5' onClick={() => { chenghReview(review) }}> עדכן</Button>
              </ModalFooter>
            </ModalContent>
          ) : (
            <ModalContent>
              <ModalHeader dir='rtl'>ביקורת</ModalHeader>
              <ModalBody dir='rtl'>
                <form onSubmit={AddReview}>
                  <Textarea
                    type='reviewText'
                    rows="10"
                    cols="5"
                    placeholder='הוסף ביקורת'
                    onChange={(e) => { setReview(e.target.value) }}
                  />
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1
                    return (
                      <label key={index}>
                        <Input
                          type='radio'
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          display={"none"}
                        />
                        <StarIcon
                          cursor={"pointer"}
                          color={currentRating <= (hover || rating) ? "yellow" : "silver"}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button bg='red.300' mr={3} onClick={onClose}>
                  ביטול
                </Button>
                <Button bg='#00ADB5' onClick={AddReview} >הוסף ביקורת</Button>
              </ModalFooter>
            </ModalContent>
          )}


        </Modal>

        {items
          .filter((item) => {
            return item.email === email ? !item : item
          })
          .map((item, index) => (

            <Card mt="1%" key={index} minH={"400px"} h="200px" minW={"150px"} w="300px" dir="rtl" bg="#222831" >
              <CardHeader letterSpacing={"1px"} fontSize={"lg"} >
                <Avatar size="sm" name={item.user} src='https://bit.ly/broken-link' />
                {" "}
                השארת חוות דעת מ
                {item.user}:
                <Divider />
                {item.createdAt}
              </CardHeader>
              <CardBody>


                {item.review}
              </CardBody>
              <CardFooter display={"flex"} justifyContent={"space-between"}>
                <Flex alignItems={"end"}   >
                  {Array(item.rating).fill("")
                    .map((star, i) => (
                      <StarIcon
                        ml="5%"
                        key={i}
                        color="yellow"
                      />
                    ))}
                </Flex>
                <Flex >
                  {item.user === user && item.email === email ? (
                    <IconButton bg="none" onClick={() => { checkEditReviewAccordingToUser(item) }}>
                      <BiEditAlt />
                    </IconButton>
                  ) : (<></>)
                  }
                </Flex>

              </CardFooter>
            </Card>


          ))}


      </Box>
    </Box>
  )
}

export default ReviewFile