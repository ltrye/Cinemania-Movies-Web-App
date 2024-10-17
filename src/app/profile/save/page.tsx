"use client";
import SkeletonLoader from "../components/SkeletonLoader";
import Image from "next/image";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { fetchSaveList } from "@/api/UserAPI";
import Link from "next/link";
import { getRandomImageLink } from "@/utils/Utils";

export default function SaveList() {
  const [list, setList] = useState();
  useEffect(() => {
    async function getList() {
      const res = await fetchSaveList();
      if (res.status === "fail") return;

      setList(res.doc.film);
    }
    getList();
  }, []);
  return (
    <>
      <section className="profile-save-container">
        {list ? (
          list.length > 0 ? (
            list.map((el) => (
              <Link href={`/title/${el._id}`} key={el._id}>
                <div className="w-48 h-72 grid grid-rows-5 rounded-lg overflow-hidden border-[0.4px] border-white border-opacity-40">
                  <div className="save-image row-start-1 row-span-4 overflow-hidden">
                    <img src={getRandomImageLink(400, 800)} className="" />
                  </div>
                  <div className="text-white h-full w-full text-center  bg-[#1A1C1C] flex justify-center items-center">{el.name}</div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ color: "white" }} className="save-empty">
              No saved films
            </div>
          )
        ) : (
          <SkeletonLoader />
        )}
      </section>
    </>
  );
}
