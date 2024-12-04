import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  Switch,
  Flex,
  Heading,
  useColorMode,
  DarkMode,
} from "@chakra-ui/react";

function AdminCoupon() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { colorMode } = useColorMode(DarkMode); // Dark Mode support
  const toast = useToast();

  // Fetch all coupons
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const result = await fetch("/api/coupons");
    const data = await result.json();
    setCoupons(data);
  };

  // Create new coupon
  const createCoupon = async () => {
    if (!code || !discount || !expirationDate) {
      toast({
        title: "בעיה",
        description: "נא למלא את כל השדות",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const result = await fetch("/api/coupons/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, discount, expirationDate, isActive }),
    });
    if (result.ok) {
      toast({
        title: "הצלחה",
        description: "קופון נוצר בהצלחה",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchCoupons();
      setCode("");
      setDiscount("");
      setExpirationDate("");
    }
  };

  // Delete a coupon
  const deleteCoupon = async (id) => {
    await fetch(`/api/coupons/delete/${id}`, {
      method: "DELETE",
    });
    toast({
      title: "נמחק",
      description: "נמחק בהצלחה",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    fetchCoupons();
  };

  return (
    <Box p={5} maxW="1000px" h={"80vh"} mx="auto" dir="rtl">
      {/* Header with Dark Mode toggle */}
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading
          size="lg"
          color={colorMode === "dark" ? "teal.400" : "gray.700"}
        >
          ניהול קופונים
        </Heading>
    
      </Flex>

      {/* Coupon Form */}
      <Box
        mb={8}
        bg={colorMode === "dark" ? "gray.700" : "gray.100"}
        p={5}
        borderRadius="md"
        boxShadow="md"
      >
        <Text
          fontSize="xl"
          mb={3}
          fontWeight="bold"
          color={colorMode === "dark" ? "teal.400" : "gray.700"}
        >
          הוסף קופון חדש
        </Text>
        <Flex flexDirection={{ base: "column", md: "row" }} gap={4}>
          <Input
            placeholder="קוד קופון"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            mb={2}
            bg={colorMode === "dark" ? "gray.600" : "white"}
            color={colorMode === "dark" ? "white" : "gray.800"}
          />
          <Input
            placeholder="הנחה (%)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            mb={2}
            bg="gray.600"
            color="white"
          />
          <Input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            mb={2}
            bg="gray.600"
            color="white"
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Text fontSize="md" color="white">
            פעיל
          </Text>
          <Switch
            isChecked={isActive}
            onChange={() => setIsActive(!isActive)}
            colorScheme="teal"
            size="lg"
          />
          <Button onClick={createCoupon} colorScheme="teal" size="md">
            הוסף קופון
          </Button>
        </Flex>
      </Box>

      {/* Coupon Table */}
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>קוד קופון</Th>
              <Th>הנחה (%)</Th>
              <Th>תאריך תפוגה</Th>
              <Th>סטטוס</Th>
              <Th>פעולות</Th>
            </Tr>
          </Thead>
          <Tbody>
            {coupons.map((coupon) => (
              <Tr key={coupon._id}>
                <Td>{coupon.code}</Td>
                <Td>{coupon.discount}%</Td>
                <Td>{new Date(coupon.expirationDate).toLocaleDateString()}</Td>
                <Td>
                  <Text color={coupon.isActive ? "green.400" : "red.400"}>
                    {coupon.isActive ? "פעיל" : "לא פעיל"}
                  </Text>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => deleteCoupon(coupon._id)}
                  >
                    מחק
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default AdminCoupon;
