import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../url";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/v1/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        }
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
