import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { RxHamburgerMenu, RxHome } from "react-icons/rx";
import { LuShoppingCart } from "react-icons/lu";
import { BsFacebook } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineReviews } from "react-icons/md";
import ReviewFile from "./ReviewFile";
function NavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exitModal, setExitModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const openExitModal = () => setExitModal(true);
  const closeExitModal = () => setExitModal(false);
  const navigate = useNavigate();
  const openReviewModal = () => setReviewModal(true);
  const closeReviewModal = () => setReviewModal(false);
  const btnRef = React.useRef();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const overlay = React.useState(<OverlayOne />);
  const signoutHandlet = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("Paymentmethod");
    window.localStorage.href = "/";
    setExitModal(false);
  };

  return (
    <>
      <Box bg="#222831" color="white" textAlign="center" py={2}>
        <Text fontSize="lg" fontWeight="bold">
          חנות הנרגילות אונליין - השאיפה שלי
        </Text>
        <Text>
          699 משלוחים{" "}
          <Text as="b" color="#00ADB5">
            חינם
          </Text>{" "}
          לכל הארץ בהזמנה מעל
        </Text>
      </Box>
      <Flex
        py={3}
        bg="#222831"
        color="#EEEEEE"
        fontSize="xl"
        boxShadow="0px 15px 19px -7px rgba(0,0,0,0.75)"
        dir="rtl"
        justifyContent={"space-between"}
        alignItems={"end"}
      >
        <Flex
          w={{ base: "45%", sm: "35%", md: "25%", lg: "15%" }}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          {!userInfo ? (
            <Box mr="7%">
              <Link to="/">התחבר</Link>
            </Box>
          ) : (
            <>
              <Flex>
                <Flex
                  w="200px"
                  justifyContent={"space-evenly"}
                  alignItems={"end"}
                >
                  <HStack color="#EEEEEE">
                    <Menu>
                      <MenuButton>
                        <RxHamburgerMenu />
                      </MenuButton>
                      <MenuList bg="#222831" color="#EEEEEE">
                        <Link to="/orderhistory">
                          <MenuItem bg="#222831"> הזמנות</MenuItem>
                        </Link>
                        <Link to="/profile">
                          <MenuItem bg="#222831">  פרופיל</MenuItem>
                        </Link>

                        <Link to="/" onClick={openExitModal}>
                          <MenuItem bg="#222831">התנתק</MenuItem>
                        </Link>
                          <Link to="/home">
                        <MenuItem bg="#222831">
                          דף הבית
                        </MenuItem>
                          </Link>
                        {userInfo.isAdmin ? (
                          <>
                            <Link to="/Admin/products">
                              <MenuItem bg="#222831">מוצרי החנות</MenuItem>
                            </Link>
                            <Link to="/Admin/orders">
                              <MenuItem bg="#222831">הזמנת הלקוחות</MenuItem>
                            </Link>
                            <Link to="/Admin/users">
                              <MenuItem bg="#222831"> רשומים למערכת</MenuItem>
                            </Link>
                          </>
                        ) : (
                          <></>
                        )}

                        <Modal
                          isCentered
                          isOpen={exitModal}
                          onClose={closeExitModal}
                        >
                          {overlay}
                          <ModalContent bg="#222831" color={"white"} dir="rtl">
                            <ModalHeader>אתה בטוח שבירצונך להתנתק</ModalHeader>
                            <ModalFooter>
                              <Button onClick={closeExitModal}>ביטול</Button>
                              <Button
                                bg="none"
                                color="white"
                                onClick={() => {
                                  signoutHandlet();
                                  navigate("/");
                                }}
                              >
                                אישור
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                       
                      </MenuList>
                    </Menu>
                  </HStack>

                  <Link to="/home">
                    <RxHome size={25} />
                  </Link>

                  <Link to="/cart" >
                    {cart.cartItems.length > 0 && (
                      <Flex textAlign={"end"} fontSize={"70%"} m={"-2"}>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Flex>
                    )}
                    <LuShoppingCart size={25} />
                  </Link>
                  <MdOutlineReviews size={23} onClick={onOpen} />
                  <Drawer
                    size={"md"}
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                  >
                    <DrawerOverlay />
                    <DrawerCloseButton />
                    <DrawerContent bg="#393E46">
                      <DrawerBody>
                        <ReviewFile />
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                  <Link to="/faivoritList"  bg="white" >
                    <AiOutlineHeart color="red" size={25} />
                  </Link>
                </Flex>
                <Text fontSize={"2xs"}>שלום וברכה {userInfo.name}</Text>
              </Flex>
            </>
          )}
        </Flex>

        <Flex
          w={{ base: "30%", sm: "20%", md: "10%" }}
          justifyContent="space-around"
          color="#EEEEEE"
        >
          <Box>
            <BsFacebook size={25} />
          </Box>
          <Box>
            <a href="https://api.whatsapp.com/send?phone=972585202271&text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%AA%D7%95%D7%9B%D7%9C%D7%95%20%D7%9C%D7%99%D7%A6%D7%95%D7%A8%20%D7%90%D7%99%D7%AA%D7%99%20%D7%A7%D7%A9%D7%A8%20%D7%91%D7%94%D7%A7%D7%93%D7%9D%20%D7%94%D7%90%D7%A4%D7%A9%D7%A8%D7%99">
              <FaWhatsapp size={25} />
            </a>
          </Box>
          <Box>
            <HiOutlineMail size={25} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default NavBar;
