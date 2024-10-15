"use client";

import getUserInfo from "@/api/checkLogin";
import { getMe } from "@/api/UserAPI";
import { useEffect, useState } from "react";

export function useUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMe().then((res) => {
      setUserData(res.data);
      setLoading(false);
 
    });
  }, []);
  return { userData, loading };
}
