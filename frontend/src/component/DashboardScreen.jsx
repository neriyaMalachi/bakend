import { Box } from "@chakra-ui/react";
import React from "react";
import Orders from "./AdminFolder/Orders";
import Products from "./AdminFolder/Products";
import Users from "./AdminFolder/Users";
function DashboardScreen() {
  return (
    <Box bg="whitesmoke" h="100vh">
      <Users />
      <Orders />
      <Products />
    </Box>
  );
}

export default DashboardScreen;
