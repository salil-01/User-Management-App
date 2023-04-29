import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Td, Tr } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const UserCard = ({
  _id,
  username,
  email,
  dob,
  role,
  location,
  handleDelete,
}) => {
  const { isAdminAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const deleteUser = async (_id) => {
    handleDelete(_id);
  };
  return (
    <Tr>
      <Td>{username}</Td>
      <Td>{email}</Td>
      <Td>{dob}</Td>
      <Td>{role}</Td>
      <Td>{location}</Td>
      {isAdminAuth ? (
        <Td>
          <Button
            border={"1px solid green"}
            leftIcon={<EditIcon />}
            _hover={{
              bg: "green",
              color: "white",
            }}
            onClick={() => navigate(`/user/edit/${_id}`)}
          >
            Edit
          </Button>
        </Td>
      ) : null}
      {isAdminAuth ? (
        <Td>
          <Button
            leftIcon={<DeleteIcon />}
            border={"1px solid orangered"}
            _hover={{
              bg: "orangered",
              color: "white",
            }}
            onClick={() => deleteUser(_id)}
          >
            Delete
          </Button>
        </Td>
      ) : null}
    </Tr>
  );
};
