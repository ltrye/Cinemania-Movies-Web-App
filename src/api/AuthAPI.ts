import { BACKEND } from "@/constant/AppConstant";
import Cookies from "js-cookie";

export async function Login(request) {
  const res = await fetch(`${BACKEND}/user/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(request),
  });

  const data = await res.json();
  Cookies.set("jwt", data.token);

  return data;
}
