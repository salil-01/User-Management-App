import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const user = {
  _id: "64443149dfab96cf09eade26",
  username: "Vikash",
  email: "random@mail.com",
  dob: "2003-11-12",
  role: "admin",
  location: "Indore",
};
export const EditUser = () => {
  const [data, setData] = useState(user || "");
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { id } = useParams();
  const toast = useToast();
  const { isAdminAuth } = useContext(AuthContext);
  // console.log(id);

  //setting header if it is a admin account for delete request
  let options = isAdminAuth ? {} : null;
  if (isAdminAuth) {
    options.headers = {
      role: "admin",
    };
  }
  // console.log(config);

  /* ------- Onchange Event Input tag ------ */
  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /* ------- Form Submit Handling ------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    setEditLoading(true);
    try {
      await axios.patch(`http://localhost:8080/user/edit/${id}`, data, options);
      // console.log(res);
      setEditLoading(false);
      toast({
        position: "top",
        title: `User Edited Successfully`,
        status: "success",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setEditLoading(false);
      toast({
        position: "top",
        title: `Error while Editing User`,
        status: "error",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const getSingleUser = async (val) => {
    setLoading(true);
    try {
      let resObj = await axios.get(`http://localhost:8080/user/${val}`);
      // console.log(resObj);
      setData(resObj.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleUser(id);
  }, []);
  return (
    <Box backgroundColor={"#F3E5F5"} margin={"20px auto"} padding={"25px"}>
      {loading ? (
        <Box mt={"10%"}>
          <Spinner size={"xl"} />
        </Box>
      ) : (
        <Box
          padding={10}
          margin={"30px auto"}
          bg="white"
          borderRadius={"5px"}
          boxShadow={"2xl"}
          width={{ base: "90%", md: "90%", lg: "40%" }}
        >
          <Heading
            as={"h3"}
            textAlign={"center"}
            fontSize={"1.0rem"}
            mb={"40px"}
          >
            Please Enter Details to Edit User
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                border={"1px dotted gray"}
                placeholder="Please Enter Username"
                name="username"
                onChange={handleChange}
                value={data.username}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                border={"1px dotted gray"}
                placeholder="Please Enter Email"
                name="email"
                onChange={handleChange}
                value={data.email}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>DOB</FormLabel>
              <Input
                border={"1px dotted gray"}
                placeholder="Please Enter Date of Birth"
                name="dob"
                onChange={handleChange}
                value={data.dob}
                type={"date"}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Role</FormLabel>
              <Select
                border={"1px dotted gray"}
                name="role"
                placeholder="Select Role"
                onChange={handleChange}
                value={data.role}
              >
                <option value="admin">Admin</option>
                <option value="explorer">Explorer</option>
              </Select>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                border={"1px dotted gray"}
                placeholder="Please Enter Location"
                name="location"
                onChange={handleChange}
                value={data.location}
                type={"text"}
              />
            </FormControl>
            <Stack spacing={10} mt={"30px"} pt={2}>
              {editLoading ? (
                <Button
                  type={"submit"}
                  variant="outline"
                  border={"1px solid #43A047"}
                  isLoading
                  loadingText="Editing User"
                  size="lg"
                  bg={"#1d2b4f"}
                  color={"white"}
                  borderRadius="5px"
                  _hover={{
                    bg: "#43A047)",
                    color: "white",
                  }}
                >
                  Edit User
                </Button>
              ) : (
                <Button
                  type={"submit"}
                  variant="outline"
                  rightIcon={<EditIcon />}
                  onClick={handleSubmit}
                  size="lg"
                  border={"1px solid #43A047"}
                  color={"#43A047"}
                  borderRadius="5px"
                  _hover={{
                    bg: "#43A047",
                    color: "white",
                  }}
                >
                  Edit User
                </Button>
              )}
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
};
