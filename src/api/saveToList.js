import { BACKEND } from "@/constant/AppConstant";
import Cookies from "js-cookie";
import { BsBookmark } from "react-icons/bs";
export  async function saveTolist(filmId) {
  try {
    const selectedFilm = {
      film: filmId,
    };

    const savePromise = await fetch(`${BACKEND}/save/mySave`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(selectedFilm),
      credentials: "include",
    });
    const saveStatus = await savePromise.json();
    if (saveStatus.status === "fail")
      alert(
        "Error while saving to list! Film has already added or you are not logged in"
      );
    else alert("Save to list successfully!");
    console.log(saveStatus);
  } catch (err) {
    alert(err);
  }
}



