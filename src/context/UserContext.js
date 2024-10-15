"use client";
import { useUserData } from "@/hook/useUserData";
import { createContext, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { userData, loading } = useUserData();

  return (
    <UserContext.Provider value={{ user: userData, loading }}>
      {children}
    </UserContext.Provider>
  );
}
