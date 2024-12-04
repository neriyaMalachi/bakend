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
  Box,
} from "@chakra-ui/react";
import {useState } from "react";
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
  const [sale, setSale] = useState(false);

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
      sale,
      numReviews: 0,
      description,
    });

    setName("")
    setCategory("")
    setSlug("")
    setImage("")
    setPrice("")
    setCountInStock("")
    setRating("")
    setbrand("")
    setDescription("")


    onClose();
  };
  return (
    <>
      <Button 
        bg="#00ADB5" 
        w={{ base: "50%", md: "20%" }} 
        p={4} 
        color="white" 
        borderRadius="md" 
        onClick={onOpen}
        _hover={{ bg: "#007D8A" }}
      >
        הוסף מוצר
      </Button>
  
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent dir="rtl" bg="#222831" color="#EEEEEE" borderRadius="lg">
          <ModalHeader mt="4" textAlign="center">צור מוצר</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              {[
                { label: 'שם', value: name, onChange: setName },
                { label: 'סוג מוצר', value: category, onChange: setCategory },
                { label: 'סלוגן', value: slug, onChange: setSlug },
                { label: 'כתובת תמונה', value: image, onChange: setImage },
                { label: 'מחיר', value: price, onChange: setPrice },
                { label: 'כמות', value: countInStock, onChange: setCountInStock },
                { label: 'מבצע', value: sale, onChange: setSale },
                { label: 'המלצות', value: rating, onChange: setRating },
                { label: 'מותג', value: brand, onChange: setbrand },
                { label: 'הסבר על המוצר', value: description, onChange: setDescription }
              ].map((field, index) => (
                <Box key={index} mb={4}>
                  <Text mb={2}>{field.label}</Text>
                  <Input
                    type="text"
                    placeholder={field.label}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    borderColor="#00ADB5"
                    focusBorderColor="#00ADB5"
                  />
                </Box>
              ))}
            </form>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              bg="#00ADB5"
              color="white"
              borderRadius="md"
              px={6}
              py={4}
              _hover={{ bg: "#007D8A" }}
              onClick={handleSubmit}
            >
              הוסף מוצר
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  
}

export default AddProduct;
