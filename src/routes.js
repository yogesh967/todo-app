import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Todo from "./pages/todo/todo";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default MainRoutes;
