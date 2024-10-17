"use client";
import { useUserData } from "@/hook/useUserData";
import { createContext, useEffect } from "react";

export interface UserContext {
  user: any;
  loading: boolean;
}

export const UserContext = createContext<UserContext>({
  user: null,
  loading: true,
});

export function UserProvider({ children }) {
  const { userData, loading } = useUserData();

  return (
    <UserContext.Provider value={{ user: userData, loading }}>
      {children}
    </UserContext.Provider>
  );
}
