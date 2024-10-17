import LoginForm from "../components/LoginForm.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Navigate to={"/account"} />
  ) : (
    <div className={"p-2 flex justify-center items-center"}>
      <LoginForm />
    </div>
  );
}
