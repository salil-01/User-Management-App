import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Flex,
  HStack,
  Text,
  Center,
  useToast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const initial = {
  username: "",
  password: "",
};
const reducerfn = (state, { type, payload }) => {
  switch (type) {
    case "USERNAME":
      return {
        ...state,
        username: payload,
      };
    case "PASSWORD":
      return {
        ...state,
        password: payload,
      };
    case "RESET":
      return initial;

    default:
      return state;
  }
};
export const Login = () => {
  const [showpass1, setShowpass1] = useState(false);
  const [formData, dispatch] = useReducer(reducerfn, initial);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  // console.log(isAdminAuth);
  const toast = useToast();
  // console.log(`${process.env.REACT_APP_REACT_APP_BACKEND_URL}`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setLoading(true);
    try {
      let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, formData);
      // console.log(response.data.user[].username);
      if (response.data.admin) {
        login("admin", response.data.admin[0].username);
        setLoading(false);
        toast({
          title: "Admin Login Successfull",
          description: `Welcome ${response.data.admin[0].username} 🤖`,
          position: "top",
          status: "success",
          variant: "top-accent",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      } else if (response.data.user) {
        login("user", response.data.user[0].username);
        setLoading(false);
        toast({
          title: "User Login Successfull",
          description: `Welcome ${response.data.user[0].username}😊`,
          position: "top",
          status: "success",
          variant: "top-accent",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Invalid Credentials",
        position: "top-right",
        status: "error",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    }
    dispatch({ type: "RESET" });
  };
  return (
    <Box height={"100vh"} padding={"20px"} backgroundColor={"#F3E5F5"}>
      <Box
        margin={"80px auto"}
        backgroundColor={"white"}
        width={{ sm: "90vw", md: "80vw", lg: "40vw" }}
        borderRadius={"5px"}
        boxShadow={"md"}
        padding={"20px"}
      >
        <Center>
          <Text as={"h2"} fontWeight={"500"} fontSize={"1.5rem"}>
            Login
          </Text>
        </Center>

        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection={"column"}
            gap={"20px"}
            padding={{ sm: "50px", md: "50px", lg: "40px" }}
          >
            <FormControl isRequired>
              <SimpleGrid
                margin={"auto"}
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Username</Text>
                </FormLabel>
                <Input
                  border={"1px dotted gray"}
                  type={"text"}
                  value={formData.username}
                  onChange={(e) =>
                    dispatch({
                      type: "USERNAME",
                      payload: e.target.value,
                    })
                  }
                  placeholder={"Enter Username Here"}
                ></Input>
              </SimpleGrid>
            </FormControl>

            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    border={"1px dotted gray"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      dispatch({
                        type: "PASSWORD",
                        payload: e.target.value,
                      })
                    }
                    type={showpass1 ? "text" : "password"}
                  ></Input>
                  <Button onClick={() => setShowpass1((prev) => !prev)}>
                    {showpass1 ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </HStack>
              </SimpleGrid>
            </FormControl>

            <FormControl>
              <Stack
                width={"50%"}
                margin={"auto"}
                spacing={10}
                mt={"30px"}
                pt={2}
              >
                {loading ? (
                  <Button
                    type={"submit"}
                    variant="outline"
                    border={"1px solid #F06292"}
                    isLoading
                    loadingText="Logging In"
                    size="lg"
                    bg={"#F06292"}
                    color={"white"}
                    borderRadius="5px"
                    _hover={{
                      bg: "#F06292",
                      color: "white",
                    }}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    type={"submit"}
                    variant="outline"
                    size="lg"
                    border={"1px solid #F06292"}
                    color={"#F06292"}
                    borderRadius="5px"
                    _hover={{
                      bg: "#F06292",
                      color: "white",
                    }}
                  >
                    Login
                  </Button>
                )}
              </Stack>
            </FormControl>
            <Box>
              <Text>
                Don't have an account?{" "}
                <Link style={{ textDecoration: "underline" }} to={"/signup"}>
                  Register{" "}
                </Link>
              </Text>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
