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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

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
    return <div>Loading...</div>;
  } else {
    return (
      <HStack bg="#393E46">
          <Table colorScheme="#222831">
        
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
                  w="50%"
                  h="70vh"
                >
                   <Thead >
            
              <Flex  justifyContent={"space-around"}>
                <Th>שם</Th>
                <Th>אימל</Th>
                <Th isNumeric>זמן הרשמות</Th>
                </Flex>
            </Thead>
            
            {items.map((item) => (
              <>
                <HStack gap={16} key={item._id} >
                  <Text >
                    {" "}
                    <Button bg="none" onClick={() => HendleDelete(item._id)}>
                      {" "}
                      <TiDelete color="#F24C3D" size={20} />
                    </Button>
                  </Text>
                  <Text>{item.name}</Text>
                  <Text>{item.email}</Text>
                  <Text isNumeric>{item.createdAt}</Text>
                </HStack>
              
                <Divider/>
                </>
            ))}
            </Stack>
          </Table>

        <Box>
              <Link to="/Admin/addUser">Add User</Link>

        </Box>
      </HStack>
    );
  }
}

export default Users;
