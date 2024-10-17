import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAction } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAction(email, password);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={"flex flex-col border border-gray-500 p-2 space-y-2"}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={"bg-blue-500 border border-gray-500"} type="submit">
        Login
      </button>
    </form>
  );
}
