import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import Todo from "../pages/todo/todo";
import ProtectedRoute from "./protectedRoute";
import NotFound from "../pages/notFound";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
