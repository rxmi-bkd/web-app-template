import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <>{children}</> : <Navigate to={"/login"} />;
}
