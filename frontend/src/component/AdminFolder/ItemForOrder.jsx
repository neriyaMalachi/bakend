import { Box,Text } from "@chakra-ui/react";
import { React} from "react";

function ItemForOrder({ props, id }) {
  return (
    <>
      {props.map((ordersItem) => (
        <Box border=" solid #00ADB5 1px" m="1%" p="2%" key={ordersItem._id}>
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
