import { ArrowRightIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";

export const About = () => {
  return (
    <Box padding={"30px"} backgroundColor={"#F3E5F5"}>
      <Text
        textAlign={"center"}
        fontSize={"1.6rem"}
        mb={"20px"}
        fontWeight={"500"}
      >
        Description & Objective
      </Text>
      <Box
        margin={"auto"}
        width={{ sm: "90vw", md: "80vw", lg: "60vw" }}
        fontSize={"1.1rem"}
        textAlign={"center"}
        mt={"20px"}
        backgroundColor={"white"}
        padding={"20px"}
        borderRadius={"5px"}
        boxShadow={"xl"}
      >
        <Text>
          It is a user management app, where individual can register as a{" "}
          <b>explorer</b> and can navigate to different sections. They can also
          see list of all other users registered on our website after
          successfull login. If an individual registers as <b>Admin</b> then
          he/she can perform all sort of <b>CRUD</b> operations like Create New
          User, Update Details of Exisitng User, Delete a user and see list of
          all users.
        </Text>
        <Text mt={"10px"}>
          The <b>objective</b> of my project was to connect frontend with the
          backend and to provide a web app where all sort of CRUD operations are
          supported.
        </Text>
      </Box>
      <Box mt={"40px"}>
        <Text
          textAlign={"center"}
          fontSize={"1.6rem"}
          mb={"20px"}
          fontWeight={"500"}
        >
          Functionalities
        </Text>
        <Flex
          flexDirection={{
            sm: "column-reverse",
            md: "column",
            lg: "row",
          }}
          gap={"15px"}
          justifyContent={"space-between"}
          alignItems={"top"}
          textAlign={"left"}
          width={{ sm: "90vw", md: "80vw", lg: "60vw" }}
          margin={"auto"}
          padding={"20px"}
          borderRadius={"5px"}
          boxShadow={"xl"}
          backgroundColor={"white"}
        >
          <Box>
            <Text as={"h2"} fontWeight={"500"} fontSize={"1.4rem"} mb={"10px"}>
              <Flex alignItems={"center"}>
                {" "}
                <ChevronRightIcon /> <Text>User Routes</Text>
              </Flex>
            </Text>
            <UnorderedList ml={"50px"} color={"brown"} fontSize={"1.1rem"}>
              <ListItem>Create a New User Account</ListItem>
              <ListItem>Login into Existing User Account</ListItem>
              <ListItem>On Successfull Login View All Users</ListItem>
              <ListItem>Logout</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Text as={"h2"} fontWeight={"500"} fontSize={"1.4rem"} mb={"10px"}>
              <Flex alignItems={"center"}>
                {" "}
                <ChevronRightIcon /> <Text>Admin Routes</Text>
              </Flex>
            </Text>
            <UnorderedList ml={"50px"} color={"brown"} fontSize={"1.1rem"}>
              <ListItem>Create a New Admin Account</ListItem>
              <ListItem>Login into Existing Admin Account</ListItem>
              <ListItem>On Successfull Login View All Users</ListItem>
              <ListItem>Edit User Details</ListItem>
              <ListItem>Delete User</ListItem>
              <ListItem>Logout</ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Box>
      <Box mt={"30px"}>
        <Text
          textAlign={"center"}
          fontSize={"1.6rem"}
          mb={"20px"}
          mt={"50px"}
          fontWeight={"500"}
        >
          Tech Stacks
        </Text>
        <Flex
          flexDirection={{ sm: "column", md: "column", lg: "row" }}
          gap={"15px"}
          justifyContent={"space-between"}
          alignItems={"top"}
          textAlign={"left"}
          width={{ sm: "90vw", md: "80vw", lg: "50vw" }}
          margin={"auto"}
          padding={"20px"}
          borderRadius={"5px"}
          boxShadow={"2xl"}
          backgroundColor={"white"}
        >
          <Box>
            <Text as={"h2"} fontWeight={"500"} fontSize={"1.4rem"} mb={"10px"}>
              <Flex alignItems={"center"}>
                {" "}
                <ChevronRightIcon /> <Text>Front End</Text>
              </Flex>
            </Text>
            <UnorderedList
              width={"100%"}
              color={"orangered"}
              ml={"50px"}
              fontSize={"1.1rem"}
            >
              <ListItem>React Js</ListItem>
              <ListItem>HTML5</ListItem>
              <ListItem>JavaScript</ListItem>
              <ListItem>React Router</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Text as={"h2"} fontWeight={"500"} fontSize={"1.4rem"} mb={"10px"}>
              <Flex alignItems={"center"}>
                {" "}
                <ChevronRightIcon /> <Text>Styling / UI</Text>
              </Flex>
            </Text>
            <UnorderedList
              width={"100%"}
              color={"orangered"}
              ml={"50px"}
              fontSize={"1.1rem"}
            >
              <ListItem>CSS3</ListItem>
              <ListItem>Chakra UI</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Text as={"h2"} fontWeight={"500"} fontSize={"1.4rem"} mb={"10px"}>
              <Flex alignItems={"center"}>
                {" "}
                <ChevronRightIcon /> <Text>Back End</Text>
              </Flex>
            </Text>
            <UnorderedList ml={"50px"} color={"orangered"} fontSize={"1.1rem"}>
              <ListItem>Node Js</ListItem>
              <ListItem>Express Js</ListItem>
              <ListItem>Mongo DB</ListItem>
              <ListItem>JavaScript</ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
