"use client";
import Cookies from "js-cookie";
import { BsBookmark } from "react-icons/bs";
export default async function saveTolist(filmId) {
  try {
    const selectedFilm = {
      film: filmId,
    };
    const saveReq = JSON.stringify(selectedFilm);
    console.log(JSON.stringify(selectedFilm));
    const savePromise = await fetch(
      `https://movieflix-production.up.railway.app/api/v1/save/mySave`,
      {
        headers:
          process.env.NODE_ENV === "development"
            ? {
                Authorization: `Bearer ${Cookies.get("jwt")}`,
                "Content-Type": "application/json",
              }
            : { "Content-Type": "application/json" },
        method: "PATCH",
        body: saveReq,
        credentials: "include",
      }
    );
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

export function SaveButton({ id }) {
  return (
    <button onClick={() => saveTolist(id)} className="bookmark-button">
      <BsBookmark style={{ height: "1.5rem", width: "1.5rem" }} />
    </button>
  );
}
