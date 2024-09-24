import { createContext, useState, useContext } from "react";
import registerRequest from "../api/usuarios/registerRequest";
import loginRequest from "../api/usuarios/loginRequest";

const AuthContext = createContext();

const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("/UseAuth/ debe ser usado dentro de /AuthProvider/");
  }

  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      setUser(response?.data);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user) => {
    try {
      const response = await loginRequest(user);
      setUser(response?.data);
      console.log("Datos:", response?.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, isRegistered, signup, login }}>{children}</AuthContext.Provider>;
};

export { AuthContext, UseAuth, AuthProvider };
