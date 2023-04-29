import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { isOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const defaultLinkStyle = { color: "black" };
  const activeLinkStyle = {
    color: "orangered",
    textDecoration: "underline",
    fontWeight: "500",
  };
  const { isUserAuth, isAdminAuth, logout, name } = useContext(AuthContext);
  //   console.log(name);
  return (
    <Flex
      border={"1px solid white"}
      width={"98%"}
      margin={"10px auto 10px"}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      <NavLink
        to={"/"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text fontSize={"1.3rem"}>Home</Text>
      </NavLink>
      <NavLink
        to={"/about"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text fontSize={"1.3rem"}>About</Text>
      </NavLink>
      <NavLink
        to={"/signup"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text fontSize={"1.3rem"}>Sign Up</Text>
      </NavLink>
      {isUserAuth || isAdminAuth ? (
        <Flex>
          <Menu>
            <MenuButton isOpen={isOpen}>
              <Text fontSize={"1.3rem"}>{name}</Text>
            </MenuButton>
            <MenuList padding={"20px"} boxShadow={"xl"}>
              <MenuItem
                borderRadius={"2px"}
                _hover={{
                  bg: "#1D2B4F",
                  color: "white",
                }}
                onClick={() => {
                  toast({
                    title: "Logged Out Successfully",
                    position: "top",
                    description: "Redirecting to  Home Page....",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  logout();
                  navigate("/");
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <NavLink
          to={"/login"}
          style={({ isActive }) => {
            return isActive ? activeLinkStyle : defaultLinkStyle;
          }}
          end
        >
          <Text fontSize={"1.3rem"}>Login</Text>
        </NavLink>
      )}

      {isUserAuth || isAdminAuth ? (
        <NavLink
          to={"/user"}
          style={({ isActive }) => {
            return isActive ? activeLinkStyle : defaultLinkStyle;
          }}
          end
        >
          <Text fontSize={"1.3rem"}>User</Text>
        </NavLink>
      ) : null}
    </Flex>
  );
};
