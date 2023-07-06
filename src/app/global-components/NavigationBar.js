"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TfiMenu } from "react-icons/tfi";
import AltNavigationBar from "./AltNavigationBar";

import SearchBox from "./SearchBox";
function checkRoute(path) {
  if (path === "/" || !path) return "none";
  else {
    const mainPath = path.match(/^\/([^/]+)/)[1];

    switch (mainPath) {
      case "home":
        return "nav-home";

      case "series":
        return "nav-series";

      case "movies":
        return "nav-movies";

      case "profile":
        return "profile";

      default:
        return "none";
    }
  }
}

//--NAV-BAR--//
export default function NavigationBar() {
  const genreList = useRef();
  let check;
  const path = usePathname();
  check = checkRoute(path);
  return (
    <>
      <section className="panel">
        <AltNavigationBar check={check} />

        <Link href="/home" className="logo">
          <span>TRYE 🎬</span>
        </Link>
        <div className="navigation-spacer" />
        <ul className="navigation-group">
          {/* <div className={`nav-switch ${check}`} /> */}
          <Link
            href="/home"
            className={`nav-item ${path === "/home" && "active"}`}
          >
            Trang chủ
          </Link>
          <Link
            href="/series"
            className={`nav-item ${path === "/series" && "active"}`}
          >
            Phim lẻ
          </Link>
          <Link
            href="/movies"
            className={`nav-item ${path === "/movies" && "active"}`}
          >
            Phim bộ
          </Link>
          <div
            onClick={(e) => {
              console.log(genreList.current.classList.length);
              genreList.current.classList.length === 1
                ? genreList.current.classList.add("genre-close")
                : genreList.current.classList.remove("genre-close");
            }}
            className={`nav-item`}
          >
            Thể loại
            <AiFillCaretDown />
          </div>
          <div ref={genreList} className="genre-list genre-close">
            <ul>
              <div></div>
            </ul>
          </div>
        </ul>
        <div>
          <SearchBox />
        </div>
        <Link href="/profile">
          <CgProfile
            className={`profile-icon ${check === "profile" && "active"}`}
          />
        </Link>
      </section>
    </>
  );
}
