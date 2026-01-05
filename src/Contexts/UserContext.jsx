/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { user } = useSelector((state) => state.user);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`
    }
  };

  //console.log(user?.token)

  return (
    <UserContext.Provider value={{ user, config, token: user?.token }}>
      {children}
    </UserContext.Provider>
  );
}
