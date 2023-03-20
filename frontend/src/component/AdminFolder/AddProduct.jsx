import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../axios";

function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setbrand] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/propertis/addProducts/add", {
      name,
      category,
      image,
      price,
      countInStock,
      brand,
      rating: 0,
      numReviews: 0,
      description,
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>הוסף מוצר</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>צור מוצר</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <form onSubmit={handleSubmit}> */}
            <Text>Name</Text>
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Text>Type product</Text>
            <Input
              type="text"
              placeholder="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <Text>Url Image</Text>
            <Input
              type="text"
              placeholder="image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
            <Text>Price</Text>
            <Input
              type="text"
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <Text>Counte products</Text>
            <Input
              type="text"
              placeholder="countInStock"
              onChange={(e) => setCountInStock(e.target.value)}
              value={countInStock}
            />
            <Text>מותג</Text>
            <Input
              type="text"
              placeholder="brand"
              onChange={(e) => setbrand(e.target.value)}
              value={brand}
            />
            <Text>Description</Text>
            <Input
              type="text"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            {/* </form> */}
          </ModalBody>

          <ModalFooter>
            <Button bg="yellow.300" onClick={handleSubmit}>
              הוסף מוצר
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProduct;
