import {
  Text,
  Button,
  Stack,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
  Toast,
} from "@chakra-ui/react";
import {useEffect, useState } from "react";
import {TiDelete } from "react-icons/ti";
import AddUser from "./AddUser";
import { HashLoader } from "react-spinners";
import Search from "../Searchfile";
function Users() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetch("http://localhost:5000/api/users/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const HendleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/users/deleteuser/${id}`, {
      method: "DELETE"
    })
      .then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
          getUsers();
        });
      })

  };
  if (error) {
    return Toast({
      title: 'בעיה בהוספה',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  } else if (!isLoaded) {
    return <Grid>
      <GridItem bg="#393E46" h={"90vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
        <HashLoader color="#00ADB5" />
      </GridItem>
    </Grid>;
  } else {
    return (
      <VStack bg="#393E46">
        <VStack mt="1%">
          <AddUser />
          <Search handleSearch={setSearch}/>
        </VStack>
        <HStack justifyContent={"space-around"} w="80%" >
          <Text >שם</Text>
          <Text>אימל</Text>
          <Text>זמן הרשמות</Text>
        </HStack>
        <Stack
          overflowY={"scroll"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#4E3636",
              borderRadius: "24px",
            },
          }}
          m="3%"
          w={{ base: "100%", sm: "100%", md: "80%", lg: "80%" }}
          h="80vh"
        >
          {items
          .filter((item)=>{
            return search.toLowerCase() === ""
            ? item
            : item.name.toLowerCase().includes(search) 
          })
          .map((item) => (
            <Stack key={item._id}>
              <HStack gap={6} >
                <Button bg="none" onClick={() => HendleDelete(item._id)}>
                  {" "}
                  <TiDelete color="#F24C3D" size={20} />
                </Button>
                <Text w="30%">{item.name}</Text>
                <Text w="30%">{item.email}</Text>
                <Text w="30%">{item.createdAt}</Text>
              </HStack>
              <Divider />
            </Stack>

          ))}
        </Stack>
      </VStack>
    );
  }
}

export default Users;
