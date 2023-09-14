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
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [rating, setRating] = useState("");
  const [brand, setbrand] = useState("");
  const [faivorit, setFaivorit] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/propertis/addProducts/add", {
      name,
      category,
      slug,
      image,
      price,
      countInStock,
      brand,
      faivorit,
      rating,
      numReviews: 0,
      description,
    });
    onClose();
  };
  return (
    <>
      <Button bg="#00ADB5" w="20%" onClick={onOpen}>הוסף מוצר</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent dir="rtl" bg="#222831" color="#EEEEEE">
          <ModalHeader mt="4">צור מוצר</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Text>שם</Text>
              <Input
                type="text"
                placeholder="שם"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Text>סוג מוצר</Text>
              <Input
                type="text"
                placeholder="סוג"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              <Text>slug</Text>
              <Input
                type="text"
                placeholder="slug"
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
              />
              <Text>כתובת תמונה</Text>
              <Input
                // type="file"
                type="text"
                placeholder="כתובת תמונה"
                // onChange={onInputChange}
                onChange={(e) => setImage(e.target.value)}

                value={image}
              // accept="image/* "
              />
              <Text>מחיר</Text>
              <Input
                type="text"
                placeholder="מחיר"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <Text>כמות</Text>
              <Input
                type="text"
                placeholder="כמות מוצר"
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
              />
               <Text>rating</Text>
              <Input
                type="text"
                placeholder="rating"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              />
              <Text>מותג</Text>
              <Input
                type="text"
                placeholder="מותג"
                onChange={(e) => setbrand(e.target.value)}
                value={brand}
              />
              <Text>הסבר על המוצר</Text>
              <Input
                type="text"
                placeholder="הסבר על המוצר"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />

            </form>
          </ModalBody>
          <ModalFooter>
            <Button bg="#00ADB5" onClick={handleSubmit}>
              הוסף מוצר
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProduct;
