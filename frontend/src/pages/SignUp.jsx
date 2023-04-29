import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  HStack,
  Text,
  Center,
  FormHelperText,
  FormErrorMessage,
  useToast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useReducer } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const initial = {
  username: "",
  email: "",
  dob: "",
  role: "",
  location: "",
  password: "",
  confirmpassword: "",
};

const reducerfn = (state, { type, payload }) => {
  switch (type) {
    case "USERNAME":
      return {
        ...state,
        username: payload,
      };

    case "EMAIL":
      return {
        ...state,
        email: payload,
      };

    case "DOB":
      return {
        ...state,
        dob: payload,
      };

    case "ROLE":
      return {
        ...state,
        role: payload,
      };

    case "LOCATION":
      return {
        ...state,
        location: payload,
      };

    case "PASSWORD":
      return {
        ...state,
        password: payload,
      };

    case "CONFIRM_PASSWORD":
      return {
        ...state,
        confirmpassword: payload,
      };

    case "RESET": {
      return initial;
    }
    default:
      return state;
  }
};
export const SignUp = () => {
  const [showpass1, setShowpass1] = useState(false);
  const [showpass2, setShowpass2] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, dispatch] = useReducer(reducerfn, initial);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (formData.password === formData.confirmpassword) {
      let obj = {
        username: formData.username,
        email: formData.email,
        dob: formData.dob,
        role: formData.role,
        location: formData.location,
        password: formData.password,
      };
      if (formData.role === "admin") {
        setLoading(true);
        try {
          await axios.post(`http://localhost:8080/admin/register`, obj);
          // console.log(response);
          setLoading(false);
          toast({
            title: "Account Created",
            position: "top",
            description: "We've created Admin Account for you.",
            status: "success",
            variant: "top-accent",
            duration: 3000,
            isClosable: true,
          });
          navigate("/login");
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast({
            title: "Error in Creating Your Account",
            position: "top",
            status: "error",
            variant: "top-accent",
            duration: 3000,
            isClosable: true,
          });
        }
      } else if (formData.role === "explorer") {
        setLoading(true);
        try {
          await axios.post(`http://localhost:8080/user/register`, obj);
          // console.log(response);
          setLoading(false);
          toast({
            title: "Account Created",
            position: "top-right",
            description: "We've created account for you.",
            status: "success",
            variant: "top-accent",
            duration: 3000,
            isClosable: true,
          });
          navigate("/login");
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast({
            title: "Error in Creating Your Account",
            position: "top-right",
            status: "error",
            variant: "top-accent",
            duration: 3000,
            isClosable: true,
          });
        }
      }
      dispatch({ type: "RESET" });
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <Box backgroundColor={"#F3E5F5"} padding={"20px"}>
      <Box
        border={"1px solid white"}
        margin={"auto"}
        mt={{ sm: "5%", md: "5%", lg: "3%" }}
        width={{ sm: "90vw", md: "80vw", lg: "45vw" }}
        borderRadius={"5px"}
        boxShadow={"md"}
        backgroundColor={"white"}
      >
        <Center mt={"20px"}>
          <Text as={"h2"} fontWeight={"500"} fontSize={"1.5rem"}>
            Create New Account
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
                  <Text as={"span"}>Email</Text>{" "}
                </FormLabel>

                <Input
                  placeholder="Email"
                  border={"1px dotted gray"}
                  type={"email"}
                  value={formData.email}
                  onChange={(e) =>
                    dispatch({
                      type: "EMAIL",
                      payload: e.target.value,
                    })
                  }
                ></Input>
              </SimpleGrid>
            </FormControl>
            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Date of Birth</Text>
                </FormLabel>
                <Input
                  type={"date"}
                  border={"1px dotted gray"}
                  value={formData.dob}
                  onChange={(e) =>
                    dispatch({
                      type: "DOB",
                      payload: e.target.value,
                    })
                  }
                  placeholder="Select DOB"
                ></Input>
              </SimpleGrid>
            </FormControl>
            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Role</Text>
                </FormLabel>
                <Select
                  placeholder="Select Role"
                  border={"1px dotted gray"}
                  value={formData.role}
                  onChange={(e) =>
                    dispatch({
                      type: "ROLE",
                      payload: e.target.value,
                    })
                  }
                >
                  <option value={"admin"}>Admin</option>
                  <option value={"explorer"}>Explorer</option>
                </Select>
              </SimpleGrid>
            </FormControl>
            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Location</Text>
                </FormLabel>
                <Input
                  border={"1px dotted gray"}
                  placeholder="Location"
                  value={formData.location}
                  type={"text"}
                  onChange={(e) =>
                    dispatch({
                      type: "LOCATION",
                      payload: e.target.value,
                    })
                  }
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
            <FormControl isRequired isInvalid={error}>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Confirm Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    border={"1px dotted gray"}
                    placeholder="Confirm Password"
                    value={formData.confirmpassword}
                    onChange={(e) =>
                      dispatch({
                        type: "CONFIRM_PASSWORD",
                        payload: e.target.value,
                      })
                    }
                    type={showpass2 ? "text" : "password"}
                  ></Input>
                  <Button onClick={() => setShowpass2((prev) => !prev)}>
                    {showpass2 ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </HStack>
              </SimpleGrid>
              {!error ? (
                <FormHelperText>
                  Please make sure password matches..
                </FormHelperText>
              ) : (
                <FormErrorMessage>*Password is not matching</FormErrorMessage>
              )}
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
                    Register
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
                    Register
                  </Button>
                )}
              </Stack>
            </FormControl>
            <Box>
              <Text>
                Already have an account?{" "}
                <Link style={{ textDecoration: "underline" }} to={"/login"}>
                  Login{" "}
                </Link>
              </Text>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
