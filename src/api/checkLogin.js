import { BACKEND } from "@/constant/AppConstant";
import Cookies from "js-cookie";

export default async function getUserInfo() {
  try {
    const res = await fetch(`${BACKEND}/user/me`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
      method: "GET",
      cache: "no-cache",
      credentials: "include",
    });
    if (!res.ok) console.log("Error checking user! Try again later");

    return res.json();
  } catch (err) {
    alert(err);
  }
}
