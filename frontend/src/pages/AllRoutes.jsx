import { Route, Routes } from "react-router-dom";
import { About } from "./About";
import { EditUser } from "./EditUser";
import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { PrivateAdminRoute } from "./PrivateAdminRoute";
import { PrivateUserRoute } from "./PrivateUserRoute";
import { SignUp } from "./SignUp";
import { User } from "./User";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Homepage />} />
      <Route path={"/about"} element={<About />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route
        path={"/user"}
        element={
          <PrivateUserRoute>
            <User />
          </PrivateUserRoute>
        }
      />
      <Route
        path={"/user/edit/:id"}
        element={
          <PrivateAdminRoute>
            <EditUser />
          </PrivateAdminRoute>
        }
      />
    </Routes>
  );
};
