import React from "react";
import {
  Box,
  Table,
  Tbody,
  Tr,
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
  Grid,
  GridItem,
  VStack,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ItemForOrder from "./ItemForOrder";
import { HashLoader } from "react-spinners";
import imagecart from "../../img/image-for-cart.png";

function Orders() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThen768] = useMediaQuery("(min-width:900px)");
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
    return (
      <Grid>
        <GridItem
          bg="#393E46"
          h={"90vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <HashLoader color="#00ADB5" />
        </GridItem>
      </Grid>
    );
  } else {
    if (items.length !== 0) {
      return (
        <Box minH={"80vh"} bg="#393E46">
          <TableContainer>
            <Table size="sm">
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
                          <MenuItem>
                            {" "}
                            {item.shippingAddress.postalCode}
                          </MenuItem>
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
            </Table>
          </TableContainer>

          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>{currentItem.shippingAddress?.fullName}</ModalHeader>
              <ModalBody dir="rtl">
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
    } else {
      return (
        <VStack
          dir="rtl"
          py={"80px"}
          h={isLargerThen768 ? "75vh" : "50vh"}
          fontSize="2xl"
          bg="#393E46"
          color="#EEEEEE"
        >
          <Box>תיבת ההזמנות ריקה!</Box>
          <Image maxW={"20vw"} src={imagecart} />
        </VStack>
      );
    }
  }
}

export default Orders;
