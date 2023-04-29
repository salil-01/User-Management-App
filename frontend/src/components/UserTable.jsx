import {
  Box,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserCard } from "./UserCard";
const arr = [
  {
    id: "64443149dfab96cf09eade26",
    username: "Vikash",
    email: "random@mail.com",
    dob: "12-11-2003",
    role: "Java Dev",
    location: "Indore",
  },
];

const deleteUser = async (id, config) => {
  return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/delete/${id}`, config);
};
export const UserTable = () => {
  const [userData, setUserData] = useState([] || arr);
  const [loading, setLoading] = useState(false);
  const { isAdminAuth } = useContext(AuthContext);
  const toast = useToast();

  //setting header if it is a admin account for delete request
  let config = isAdminAuth ? {} : null;
  if (isAdminAuth) {
    config.headers = {
      role: "admin",
    };
  }

  /* -------  Delete Single User------ */
  const handleDelete = async (id) => {
    // console.log(id);
    setLoading(true);
    deleteUser(id, config)
      .then(() => {
        getData(`${process.env.REACT_APP_BACKEND_URL}/user`);
        toast({
          title: "User Deleted",
          position: "top",
          status: "success",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        getData(`${process.env.REACT_APP_BACKEND_URL}/user`);
        toast({
          title: "Error while Deleting User",
          position: "top",
          status: "error",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* -------Get Data of All Users ------ */
  const getData = async (url) => {
    setLoading(true);
    try {
      let res = await axios.get(url);
      // console.log(res);
      setUserData(res.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  /* ------- Get Users ------ */
  useEffect(() => {
    if (userData.length === 0) {
      getData(`${process.env.REACT_APP_BACKEND_URL}/user`);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Box mt={"10%"}>
          <Spinner size={"xl"} />
        </Box>
      ) : (
        <Table variant={"striped"} bg={"teal.200"}>
          <Thead>
            <Tr>
              <Th fontSize={"0.9rem"}>Username</Th>
              <Th fontSize={"0.9rem"}>Email</Th>
              <Th fontSize={"0.9rem"}>Date of Birth</Th>
              <Th fontSize={"0.9rem"}>Role</Th>
              <Th fontSize={"0.9rem"}>Location</Th>
              {isAdminAuth ? <Th fontSize={"0.9rem"}>Edit</Th> : null}
              {isAdminAuth ? <Th fontSize={"0.9rem"}>Delete</Th> : null}
            </Tr>
          </Thead>

          <Tbody>
            {userData?.map((element) => (
              <UserCard
                key={element._id}
                handleDelete={handleDelete}
                {...element}
              />
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};
