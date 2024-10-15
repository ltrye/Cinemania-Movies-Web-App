import { BACKEND } from "@/constant/AppConstant";
import Cookies from "js-cookie";

export async function getMe() {
  const res = await fetch(`${BACKEND}/user/me`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    },
    method: "GET",
    cache: "no-cache",
    credentials: "include",
  });
  if (!res.ok) console.log("Error checking user! Try again later");
  const resJson = await res.json();
  return resJson;
}

export async function logOut() {
  if (process.env.NODE_ENV === "development") Cookies.remove("jwt");
  else {
    const res = await fetch(`${BACKEND}logout`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
  }
  window.location.href = "/user/login";
}

export async function fetchSaveList() {
  const res = await fetch(`${BACKEND}/save/mySave`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    },
    cache: "no-cache",
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
