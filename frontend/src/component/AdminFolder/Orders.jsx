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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
function Orders() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
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
      <Box bg="silver">
        <TableContainer>
          <Table size="sm">
            <Thead>
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
            </Thead>
            {items.map((item) => (
              <Tbody key={item._id}>
                <Tr>
                  <Td>{item._id}</Td>
                  <Td key={item._id}>
                    <Button onClick={onOpen}> הזמנה</Button>

                    {console.log(item.orderItems)}
                    <Modal
                      closeOnOverlayClick={false}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalHeader>
                          {item.shippingAddress.fullName}
                        </ModalHeader>
                        {/* {item.orderItems.map((ordersItem) => (
                          <> */}
                        {/* {console.log(item.orderItems._id)}
                          {console.log(item._id)} */}
                        <ModalBody dir="rtl" key={item.orderItems._id} pb={6}>
                          {item.orderItems.map((ordersItem) => (
                            <>
                              <Text>שם: {ordersItem.name}</Text>
                              <Text> כמות:{ordersItem.quantity}</Text>
                              <Text> מחיר: {ordersItem.price}</Text>
                              <Text> סוג: {ordersItem._id}</Text>
                            </>
                          ))}
                        </ModalBody>

                        {/* </>
                             ))} */}
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={onClose}>
                            סגור
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        bg="silver"
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
            <Tfoot>
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
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default Orders;
