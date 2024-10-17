import { useContext, createContext, useState } from "react";
import AuthService from "../services/AuthService.jsx";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const { login, logout, whoami } = AuthService();
  const [isAuthenticated, setIsAuthenticated] = useState(initIsAuthenticated());
  const [user, setUser] = useState({});

  function initIsAuthenticated() {
    const auth_state = localStorage.getItem("isAuthenticated");
    return auth_state !== null && auth_state === "true";
  }

  async function loginAction(email, password) {
    let response = await login(email, password);

    if (response.status === 200) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }

    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    return false;
  }

  async function logoutAction() {
    let response = await logout();

    if (response.status === 200) {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      return true;
    }

    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    return false;
  }

  async function whoamiAction() {
    let response = await whoami();

    if (response.status === 200) {
      return response.data.data;
    }

    return {};
  }

  return (
    <AuthContext.Provider
      value={{
        loginAction,
        logoutAction,
        whoamiAction,
        isAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
