import React, { useContext } from "react";
import {
  Image,
  Button,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";

function Cards(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/propertis/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  return (
    <Card maxW="sm" p="2%" border="1px solid">
      <CardBody>
        <Link to={`/product/${product.slug}`}>
          <Image src={product.image} alt={product.name} w="180px" h="190px" />
        </Link>

        <Stack mt="6" spacing="3">
          <Link to={`/product/${product.slug}`}>
            <Heading size="md">{product.name}</Heading>
          </Link>
          <strong>
            <Text color="blue.600" fontSize="2xl">
              {product.price}
            </Text>
          </strong>
        </Stack>
        <span color="gold">Rating:{product.rating}</span>
      </CardBody>
      <span color="gold">Reviews:{product.numReviews} </span>

      {product.countInStock === 0 ? (
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              p="15%"
              bg="gold"
              borderRadius="10%"
              variant="light"
              disabled
            >
              חסר במלאי
            </Button>
          </ButtonGroup>
        </CardFooter>
      ) : (
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button 
            p="15%" 
            bg="gold" 
            borderRadius="10%"
            onClick={()=>addToCartHandler(product)}
            >
              הוסף להגלה
            </Button>
          </ButtonGroup>
        </CardFooter>
      )}
      <Divider />
    </Card>
  );
}

export default Cards;
