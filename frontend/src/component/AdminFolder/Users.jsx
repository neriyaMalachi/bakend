import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Users() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
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
    console.log(id);

    fetch(`http://localhost:5000/api/users/deleteuser/${id}`, {
      method: "DELETE",
    })
      .then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
          getUsers();
        });
      })
      .catch(error);
      {
      console.log(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box bg="silver">
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>מחיקת משתמש</Th>
                <Th>שם</Th>
                <Th>קוד אישי</Th>
                <Th>אימל</Th>
                <Th>ת"ז</Th>
                <Th isNumeric>זמן הרשמות</Th>
              </Tr>
              {/* <Link to="/Admin/addUser">Add User</Link> */}
            </Thead>
            {items.map((item) => (
              <Tbody border="2px " key={item._id}>
                <Tr>
                  <Td display="flex" justifyContent="space-between">
                    {" "}
                    <Button onClick={() => HendleDelete(item._id)}>
                      {" "}
                      <TiDelete color="red" size={20} />
                    </Button>
                  </Td>
                  <Td>{item.name}</Td>
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
