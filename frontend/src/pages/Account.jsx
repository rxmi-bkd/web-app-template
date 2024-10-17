import { useAuthContext } from "../contexts/AuthContext.jsx";
import { useEffect } from "react";

export default function Account() {
  const { logoutAction, user, setUser, whoamiAction } = useAuthContext();

  useEffect(() => {
    whoamiAction().then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <div className={"justify-center items-center p-2 flex flex-col space-y-2"}>
      <div
        className={
          "justify-center items-center  p-2 border flex flex-col border-gray-500"
        }
      >
        <h1 className={"underline"}>Account</h1>
        <p>{user.email}</p>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
      </div>
      <button
        className={"bg-blue-500 border-2 border-gray-500"}
        onClick={logoutAction}
      >
        Logout
      </button>
    </div>
  );
}
