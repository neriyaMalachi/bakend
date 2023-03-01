import { Text } from "@chakra-ui/react";
import { React, useState } from "react";

function ItemForOrder(item ,id) {
  const [search, setSearch] = useState(item);

  return (
    <>
      {item
        .filter((orderForUser) => {
          return orderForUser._id.toLowerCase() ===
            orderForUser.product.toLowerCase().includes(search)
            ? orderForUser
            : "";
        })
        .map((ordersItem) => (
          <>
            <Text>שם: {ordersItem.name}</Text>
            <Text> כמות:{ordersItem.quantity}</Text>
            <Text> מחיר: {ordersItem.price}</Text>
            <Text> סוג: {ordersItem._id}</Text>
          </>
        ))}
    </>
  );
}

export default ItemForOrder;
