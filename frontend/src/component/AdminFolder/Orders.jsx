import React from "react";
import {
  Box,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ItemForOrder from "./ItemForOrder";
function Orders() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box bg="#393E46">

        <TableContainer>
          <Table size="sm">

            {/* <Stack
              overflowY={"scroll"}
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
              w="100%"
              h="90vh"
            > */}
              {/* <Flex bg="red" w="100%">
                <Tr>
                  <Th>מספר הזמנה</Th>
                  <Th>הזמנות</Th>
                  <Th>כתובת הזמנה</Th>
                  <Th>שיטת תשלום</Th>
                  <Th>מחיר הזמנה</Th>
                  <Th>משתמש</Th>
                  <Th>שולם\לא שולם</Th>
                  <Th>נשלח\לא נשלח</Th>
                  <Th isNumeric>שעת\יום חודש\ הזמנה</Th>
                </Tr>
              </Flex> */}

              {items.map((item) => (
                <Tbody key={item._id}>
                  <Tr>
                    <Td>{item._id}</Td>
                    <Td>
                      <Button
                        bg="#00ADB5"
                        onClick={() => {
                          setCurrentItem(item);
                          onOpen();
                        }}
                      >
                        {" "}
                        הזמנה
                      </Button>
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          bg="#00ADB5"
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                        >
                          כתובת הזמנה
                        </MenuButton>
                        <MenuList>
                          <MenuItem> {item.shippingAddress.fullName}</MenuItem>
                          <MenuItem> {item.shippingAddress.address}</MenuItem>
                          <MenuItem> {item.shippingAddress.city}</MenuItem>
                          <MenuItem> {item.shippingAddress.postalCode}</MenuItem>
                          <MenuItem> {item.shippingAddress.country}</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                    <Td>{item.paymentMethod}</Td>
                    <Td>{item.totalPrice}</Td>
                    <Td>{item.shippingAddress.fullName}</Td>
                    <Td>{item.isPaid ? "שולם" : "לא שולם"}</Td>
                    <Td>{item.isDeliverd ? "נשלח" : "לא נשלח"}</Td>
                    <Td isNumeric>{item.createdAt}</Td>
                  </Tr>
                </Tbody>
              ))}
            {/* </Stack> */}

          </Table>
        </TableContainer>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{currentItem.shippingAddress?.fullName}</ModalHeader>
            <ModalBody dir="rtl" pb={6}>
              <ItemForOrder
                id={currentItem._id}
                props={currentItem.orderItems}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                סגור
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>
    );
  }
}

export default Orders;
