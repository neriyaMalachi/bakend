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
} from "@chakra-ui/react";
import {useEffect, useState}from "react";

function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    name: '',
    category: '',
    slug: '',
    image: '',
    price: '',
    countInStock: '',
    brand: '',
    rating: '',
    numReviews: '',
    description: ''
  })

  useEffect(() => {
    console.log(data);
  },[data])

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({e})
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>צור מוצר</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input placeholder="Name" />
              <Input placeholder="category" />
              <Input placeholder="slug" />
              <Input placeholder="image" />
              <Input placeholder="price" />
              <Input placeholder="countInStock" />
              <Input placeholder="brand" />
              <Input placeholder="rating" />
              <Input placeholder="numReviews" />
              <Input placeholder="description" />

              <Button type="submit">AddProduct</Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProduct;
