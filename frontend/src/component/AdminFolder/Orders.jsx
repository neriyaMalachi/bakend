import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
                  <Td>
                    {/* <Accordion reduceMotion allowToggle>
                      <AccordionItem h={"50"} overflowY={"scroll"}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              הזמנה
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        {item.orderItems.map((ordersItem) => (
                          <AccordionPanel dir="rtl" key={ordersItem._id} pb={4}>
                            שם: {ordersItem.name}
                            <Divider />
                            כמות:{ordersItem.quantity}
                            <Divider />
                            מחיר: {ordersItem.price}
                            <Divider />
                            סוג: {ordersItem._id}
                          </AccordionPanel>
                        ))}
                      </AccordionItem>
                    </Accordion> */}

                    <Button onClick={onOpen}> הזמנה</Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{item.shippingAddress.fullName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {item.orderItems.map((ordersItem) => (
                            <Box
                              dir="rtl"
                              key={ordersItem._id}
                              pb={4}
                            >
                              שם: {ordersItem.name}
                              <Divider />
                              כמות:{ordersItem.quantity}
                              <Divider />
                              מחיר: {ordersItem.price}
                              <Divider />
                              סוג: {ordersItem._id}
                            </Box>
                          ))}
                        </ModalBody>

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
