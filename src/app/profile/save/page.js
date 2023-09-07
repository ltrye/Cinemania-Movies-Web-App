"use client";
import SkeletonLoader from "../components/SkeletonLoader";
import Image from "next/image";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
export default function SaveList({ id }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getList() {
      const res = await fetchList();
      if (res.status === "fail") return;

      setList(res.doc.film);
    }
    getList();
  }, []);
  return (
    <>
      <section className="profile-save-container">
        {list.length > 0 ? (
          list.map((el) => {
            if (!el) return;
            return (
              <div className="save-element">
                <div className="save-image">
                  <Image href={el.poster} />
                </div>
                <div className="save-description">{el.name}</div>
              </div>
            );
          })
        ) : (
          <SkeletonLoader />
        )}
      </section>
    </>
  );
}

async function fetchList() {
  const list = await fetch(
    "https:///movieflix-ljqx.onrender.com/api/v1/save/mySave",
    {
      headers:
        process.env.NODE_ENV === "development"
          ? {
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            }
          : {},
      cache: "no-cache",
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  return list.json();
}
