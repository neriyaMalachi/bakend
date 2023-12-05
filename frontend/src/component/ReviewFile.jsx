import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, Stack, Text, Textarea, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from "../Store";
import { StarIcon } from '@chakra-ui/icons';
// import { useNavigate } from "react-router-dom";
import { BiEditAlt } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md'


function ReviewFile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [review, setReview] = useState();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [items, setItems] = useState([]);
  // const [reviewaccordingUser, setReviewaccordingUser] = useState();
  // const [error, setError] = useState(null);
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
      .then(
        (result) => {
          setItems(result);
        },
        // (error) => {
        //   setError(error);
        // }
      );


  };
  const check = async () => {
    const res = await axios.post("/api/reviews/checkIfUserInputReview", {
      email,
    })
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
      setUserPutInReview(true)
    } catch {
      toast({
        title: 'קיימת במערכת חוות דעת ממך',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      onClose();
    }
  }
  // const checkEditReviewAccordingToUserForHederButton = async (item) => {
  //   {
  //     items.filter((edit) => {
  //       return edit.email === email ? (
  //         setReviewaccordingUser(edit._id)
  //       ) : (
  //         <></>
  //       )
  //     })
  //   }
  // }
  const checkEditReviewAccordingToUser = async (item) => {
    setReview(item)
    // setReviewaccordingUser(item)
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
  }
  const editReview = async (item) => {
    let idForReview;
    {
      items.filter((edit) => {
        return edit.email === email ? (
          // setReviewaccordingUser(edit._id),
          idForReview = edit._id
        ) : (
          <></>
        )
      })
    }
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
      })
    getReviews()
    onClose()
  }
  const deletereview = async (id) => {
    await fetch(`http://localhost:3000/api/reviews/deleteReview/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        setUserPutInReview(false)
        setRating(null)
        getReviews();
        console.log(userPutInReview);
      });
    });
  }

  return (

    <Box >
      <Text m="5%" textAlign={"center"} fontSize={"xx-large"}>ביקורות</Text>
      <Flex  alignItems={"center"} justifyContent={"center"} direction={"column"} >
        {items.filter((item) => {
          return item.email === email ? item : !item
        }).map((item, index) => (
          <Card mt="1%" key={index} minH={"400px"} h="200px" minW={"150px"} w="300px" dir="rtl" bg="#222831" >
            <CardHeader letterSpacing={"1px"} fontSize={"lg"} >
              <Avatar size="sm" name={item.user} src='https://bit.ly/broken-link' />
              {" "}
              השארת חוות דעת מ
              {item.user}:
              <Divider />
              {/* {item.createdAt} */}
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
                  <>
                    <IconButton bg="none" onClick={() => {
                      checkEditReviewAccordingToUser(item._id)

                    }}>
                      <BiEditAlt />
                    </IconButton>
                    <IconButton bg="none" onClick={() => { deletereview(item._id) }}>

                      <MdOutlineDelete />
                    </IconButton>
                  </>
                ) : (<></>)
                }
              </Flex>

            </CardFooter>
          </Card>
        ))}
        {!userPutInReview ?(
           <Button mt="3" onClick={() => {
            check();
            onOpen();
          }} >הוסף ביקורת</Button>
        ):(
          <></>
        )}
       


      </Flex>
      {userPutInReview ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
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
                // value={review}
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
              <Button bg='#00ADB5' onClick={
                () => {
                  editReview(state.userInfo._id)
                }
              }> עדכן</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
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
        </Modal>
      )}
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
                {/* {item.createdAt} */}
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