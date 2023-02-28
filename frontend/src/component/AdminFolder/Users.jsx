import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {TiDelete} from 'react-icons/ti'


function Users() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
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
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
     <Box bg="silver" >
       
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  {/* <Th>מחיקת משתמש</Th> */}
                  <Th>שם</Th>
                  <Th>קוד אישי</Th>
                  <Th>אימל</Th>
                  <Th>ת"ז</Th>
                  <Th isNumeric>זמן הרשמות</Th>
                </Tr>
              </Thead>
              {items.map((item) => (
              <Tbody border="2px " key={item._id} >
                <Tr>
                  
                  <Td display="flex"  justifyContent="space-between" ><TiDelete color="red" size={20} />{item.name}</Td>
                  <Td>{item._id}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.password}</Td>
                  <Td isNumeric>{item.createdAt}</Td>
                </Tr>
               
              </Tbody>
                ))}
            </Table>
          </TableContainer>

         
          </Box>
    );
  }
}

export default Users;
