import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from "../Store";
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";


function ReviewFile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [review, setReview] = useState();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate =useNavigate();
  const toast = useToast();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const user = state.userInfo.name;
  const email = state.userInfo.email;
  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = () => {
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
  const AddReview = async () => {
    try{
    await axios.post("/api/reviews/addReview", {
      email,
      user,
      rating,
      review,
    });
    onClose();
  }catch(err){
    toast({
      title: 'קיימת במערכת חוות דעת ממך',
      status: 'error',
      duration: 4000,
      isClosable: true,
    })
    onClose();
  }
  }
  return (
    <Box minH={"80vh"} bg="#393E46">
      <Text textAlign={"center"} fontSize={"xx-large"}>ביקורות</Text>
      <Button onClick={onOpen} >add review</Button>
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
                     spacing={"4px"}
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
      <Flex
        justifyContent="space-evenly"
        flexWrap={"warp"}
      >
        {items.map((item, index) => (
          <Card key={index} minH={"400px"} h="200px" minW={"150px"} w="300px" dir="rtl" bg="#222831" >
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
              {/* {item.rating} */}
            </CardBody>
            <CardFooter>
            {Array(item.rating).fill("")
            .map((star, i) => (
             
                  <StarIcon
                    key={i}
                    color="yellow" 
                  />
                  
                ))}
            </CardFooter>
          </Card>
        ))}
      </Flex>


    </Box>
  )
}

export default ReviewFile