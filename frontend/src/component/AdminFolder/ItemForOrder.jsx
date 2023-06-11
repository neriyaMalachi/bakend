import { Box, Text } from "@chakra-ui/react";
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
          <Box key={ordersItem._id} >
            <Text>שם: {ordersItem.name}</Text>
            <Text> כמות:{ordersItem.quantity}</Text>
            <Text> מחיר: {ordersItem.price}</Text>
            <Text> סוג: {ordersItem._id}</Text>
          </Box>
        ))}
    </>
  );
}

export default ItemForOrder;
