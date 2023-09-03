import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  TableContainer,
  Button,
  Stack,
  Flex,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import { HashLoader } from "react-spinners";

function Users() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Grid>
      <GridItem bg="#393E46" h={"90vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
        <HashLoader color="#00ADB5" />
      </GridItem>
    </Grid>;
  } else {
    return (
      <VStack bg="#393E46">
        <Box>
          <AddUser />
        </Box>
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
                  w={{base:"100%",sm:"100%",md:"80%",lg:"80%"}}
                  h="80vh"
                >
            
              <HStack justifyContent={"space-around"} >
                <Text >שם</Text>
                <Text>אימל</Text>
                <Text>זמן הרשמות</Text>
                </HStack>
            
            {items.map((item) => (
              <Stack  key={item._id}>
                <HStack gap={6} >
                    <Button  bg="none" onClick={() => HendleDelete(item._id)}>
                      {" "}
                      <TiDelete color="#F24C3D" size={20} />
                    </Button>
                  <Text w="30%">{item.name}</Text>
                  <Text w="30%">{item.email}</Text>
                  <Text  w="30%">{item.createdAt}</Text>
                </HStack>
                <Divider/>
            </Stack>

            ))}
            </Stack>


      </VStack>
    );
  }
}

export default Users;
