import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  clearSession,
  getSession,
  setSession,
} from "../services/utils/ManageSessions";

const AuthContext = createContext();

const getInitialState = () => {
  const currentUser = getSession("token");
  return currentUser ? jwtDecode(currentUser.toString()) : null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialState);

  const login = (token) => {
    setSession("token", token);
    const decoded = jwtDecode(token.toString());
    setUser(decoded);
  };

  const logout = () => {
    clearSession("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
