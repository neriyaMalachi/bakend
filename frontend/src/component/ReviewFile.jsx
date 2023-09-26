import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from "../Store";

function ReviewFile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [review, setReview] = useState();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const user = state.userInfo.name;
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
  const handleSubmit = async(e) => {
    e.preventDefault();
console.log(review);
console.log(user);
await axios.post("/api/reviews/addReview",{
  user,
  review,
  
});

    onClose();
  
  }
  return (
    <Box minH={"80vh"} bg="#393E46">
      <Text textAlign={"center"} fontSize={"xx-large"}>ביקורות</Text>
      <Button onClick={onOpen} >add review</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ביקורת</ModalHeader>
          <ModalCloseButton />
          <ModalBody dir='rtl'>
            <form onSubmit={handleSubmit}>
            <Input
              type='text'
              variant={"flushed"}
              placeholder='הוסף ביקורת'
              htmlSize={100}
              onChange={(e) => { setReview(e.target.value) }}
            />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button bg='red.300' mr={3} onClick={onClose}>
              ביטול
            </Button>
            <Button bg='#00ADB5' onClick={handleSubmit} >הוסף ביקורת</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

{items.map((item,index)=>(
  <Text>
    {item.review}
  </Text>
))}


    </Box>
  )
}

export default ReviewFile