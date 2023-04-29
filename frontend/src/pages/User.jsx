import { Box, Text } from "@chakra-ui/react";
import { UserTable } from "../components/UserTable";

export const User = () => {
  return <Box width={"98%"} margin={"auto"} mt={"30px"}>
    <Text as={"h1"} fontSize={"1.5rem"} fontWeight={"500"} mb={"10px"}>List Of All Users</Text>
  <UserTable/>
  </Box>;
};
