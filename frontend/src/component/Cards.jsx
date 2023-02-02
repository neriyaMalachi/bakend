import React, { useContext } from "react";
import {
  Image,
  Button,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Divider,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { StarIcon } from "@chakra-ui/icons";

function Cards(props) {
  const { product } = props;
  const ratingStar = 5;
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
    <Card
      boxShadow="5px 5px 8px 9px rgba(0,0,0,0.75)"
      display="flex"
      flexWrap="wrap"
      alignContent="flex-start"
      w="15%"
      border="1px solid"
      bg="silver"
    >
      <CardBody>
        <Link to={`/product/${product.slug}`}>
          <Image src={product.image} alt={product.name} w="100%" h="50%" />
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
        
        <span color="gold">Rating:
     
                <Box display="flex" mt="2" alignItems="center">
                  {Array(5)
                    .fill("")
                    .map((_,i) => (
                      <StarIcon
                        key={i}
                        color={i < product.rating ? "yellow" : "white"}
                      />
                    ))}
                </Box>
             </span>
            
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
              bg="silver"
              w="15vh"
              borderRadius="10%"
              onClick={() => addToCartHandler(product)}
            >
              הוסף להגלה
            </Button>
          </ButtonGroup>
        </CardFooter>
      )}

      {/* <Divider /> */}
    </Card>
  );
}

export default Cards;
