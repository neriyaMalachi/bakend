import { Box, Divider, Text } from "@chakra-ui/react";
import { React, useState } from "react";

function ItemForOrder({ props, id }) {
  /* const [search, setSearch] = useState(item); */

  return (
    <>
      {props
        /* .filter((orderForUser) => {
          return orderForUser._id.toLowerCase() ===
            orderForUser.product.toLowerCase().includes(search)
            ? orderForUser
            : "";
        }) */
        .map((ordersItem) => (
          <Box border=" solid #00ADB5 1px" m="1%" p="2%" key={ordersItem._id} >
            <Text fontSize={"25px"}>שם: {ordersItem.name}</Text>
            <Text> כמות:{ordersItem.quantity}</Text>
            <Text> מחיר: {ordersItem.price}</Text>
            <Text> סוג: {ordersItem._id}</Text>
          </Box>
        ))}
    </>
  );
}

export default ItemForOrder;
