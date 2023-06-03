"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TfiMenu } from "react-icons/tfi";
import AltNavigationBar from "./AltNavigationBar";

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
//--SEARCH COMPONENT--//
function SearchBox({}) {
  const searchBox = useRef();
  const [searchOption, setSearchOption] = useState({
    style: null,
    mount: false,
  });

  useEffect(() => {
    function handleClick(e) {
      if (searchBox.current && !searchBox.current.contains(e.target))
        setSearchOption({ style: "fade out", mount: true });
    }
    if (searchOption.mount) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOption]);

  function transitionEndHandler() {
    if (searchOption.mount && searchOption.style === "fade out")
      setSearchOption({ style: null, mount: false });
  }
  return (
    <>
      <AiOutlineSearch
        onClick={() => {
          if (searchOption.mount)
            setSearchOption({ style: "fade out", mount: true });
          else setSearchOption({ style: null, mount: true });
        }}
        className="search-icon"
      />
      <div ref={searchBox} tabIndex={0} className="search-wrapper">
        {searchOption.mount && (
          <section
            onAnimationEnd={transitionEndHandler}
            className={`search-box ${
              searchOption.style === "fade out" && "search-close "
            }`}
          >
            <input placeholder="DITMEHOGMINH" className="nav-input"></input>
          </section>
        )}
      </div>
    </>
  );
}

//--NAV-BAR--//
export default function NavigationBar() {
  let check;
  const path = usePathname();
  check = checkRoute(path);
  return (
    <>
      <section className="panel">
        <AltNavigationBar check={check} />

        <div className="logo">
          <span>TRYE</span>
        </div>
        <div className="navigation-spacer" />
        <ul className="navigation-group">
          <div className={`nav-switch ${check}`} />
          <Link href="/home" className="nav-item">
            Home
          </Link>
          <Link href="/series" className="nav-item">
            Series
          </Link>
          <Link href="/movies" className="nav-item">
            Movies
          </Link>
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
