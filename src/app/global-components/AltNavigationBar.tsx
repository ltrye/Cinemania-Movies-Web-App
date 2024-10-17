import { useRef, useState, useEffect } from "react";
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AltNavigationBar({ check }) {
  const altNav = useRef();
  const [navOption, setNavOption] = useState({
    style: null,
    mount: false,
  });
  useEffect(() => {
    function handleClick(e) {
      if (altNav.current && !altNav.current.contains(e.target))
        setNavOption({ style: "fade out", mount: true });
    }
    if (navOption.mount) document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [navOption, check]);

  function animationEndHandler() {
    if (navOption.mount && navOption.style === "fade out")
      setNavOption({ style: null, mount: false });
  }

  return (
    <>
      <TfiMenu
        onClick={() => {
          console.log(navOption);
          if (navOption.mount) setNavOption({ style: "fade out", mount: true });
          else setNavOption({ style: null, mount: true });
        }}
        className={`menu-icon`}
      />
      {navOption.mount && (
        <section
          onBlur={(e) => {
            if (altNav.current && !altNav.current.contains(e.target))
              setNavOption({ style: "fade out", mount: true });
          }}
          tabIndex={1}
          onAnimationEnd={animationEndHandler}
          ref={altNav}
          className={`alt-nav ${navOption.style === "fade out" && "close"}`}
        >
          <Link
            href="/home"
            className={`useFont alt-nav-item ${
              check === "nav-home" && "active"
            }`}
          >
            Home
          </Link>
          <Link
            href="/series"
            className={`useFont alt-nav-item ${
              check === "nav-series" && "active"
            }`}
          >
            Series
          </Link>
          <Link
            href="/movies"
            className={`useFont alt-nav-item ${
              check === "nav-movies" && "active"
            }`}
          >
            Movies
          </Link>
        </section>
      )}
    </>
  );
}
