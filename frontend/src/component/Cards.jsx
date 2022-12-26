import React from "react";
import {
  Image,
  Button,
  Link,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";

function Cards(props) {
  const { product } = props;
  return (
    // <Box
    //
    //     //   maxW="sm"
    //     //   borderWidth="1px"
    //     //   borderRadius="lg"
    //     //   overflow="hidden"
    //       p="1%"
    //       border="1px solid"
    //     //   display="flex"

    //     >

    //       <Link href={`/product/${product.name}`}  >
    //         <Image src={product.image} alt={product.name} />

    //         <Box>{product.name}</Box>
    //       </Link>
    //       <Box>
    //         <strong> {product.price}</strong>
    //       </Box>
    //       {/* <Box>{product.rating}</Box>
    //       <Box>{product.description}</Box> */}
    //       <Box>
    //         <Button colorScheme="red">Add to cart</Button>
    //       </Box>
    //      </Box>

    <Card maxW="sm" p="2%" border="1px solid">
      <CardBody>
        <Link href={`/product/${product.name}`}>
          <Image src={product.image} alt={product.name} w="180px" h="190px" />
        </Link>

        <Stack mt="6" spacing="3">
          <Link href={`/product/${product.name}`}>
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
