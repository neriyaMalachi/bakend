import React from 'react'
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../axios";

function AddUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");


  const HendlerSubmit = async (e) => {
   await axios.post("/api/users/addUser", {
    name,
    email,
    password,
    admin,
  });

    onClose();
  }
  return (
    <>
      <Button bg="#00ADB5" onClick={onOpen}> הוסף משתמש</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent dir="rtl" bg="#222831" color="#EEEEEE">
          <ModalHeader mt="4">הוסף משתמש</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         

              <Stack spacing={3}>
                <Input
                  placeholder='שם מלא'
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder='אימייל'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input

                  placeholder='סיסמה'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input

                  placeholder='הוא אדמין? true / false'
                  onChange={(e) => setAdmin(e.target.value)}
                />
              </Stack>

          </ModalBody>

          <ModalFooter>
            <Button onClick={HendlerSubmit} bg="#00ADB5" >
              הוסף משתמש
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddUser