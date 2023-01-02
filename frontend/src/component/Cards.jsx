import React from "react";
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
import { Link } from "react-router-dom";

function Cards(props) {
  const { product } = props;
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

      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button p="15%" bg="red" borderRadius="100%">
            Buy now
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Cards;
