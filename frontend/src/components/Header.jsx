import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Header() {
  const { isAuthenticated } = useAuthContext();

  return (
    <header
      className={
        "flex justify-between p-2 border-gray-500 border-b border-t-4 border-t-blue-500"
      }
    >
      <h1>My App</h1>
      <nav>
        <ul className={"flex space-x-2"}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to={"/account"}>Account</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
