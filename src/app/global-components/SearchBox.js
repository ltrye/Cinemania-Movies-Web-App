import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import requestSearch from "../global-utils/requestSearch";
import Image from "next/image";
import "./style/SearchBox.scss";

function SearchEl(el) {
  const year = new Date(el.el.date).getFullYear();
  return (
    <>
      <div className="search-element">
        <div className="search-image">
          <Image fill />
        </div>
        <span className="search-description">
          {el.el.name}
          <br />{" "}
          <span className="useFont" style={{ color: "#01c38d" }}>
            {year}
          </span>
        </span>
      </div>
    </>
  );
}

export default function SearchBox({}) {
  const [searchList, setSearchList] = useState([]);

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
            <form
              onSubmit={async (e) => {
                const searchRes = await requestSearch(e);
                setSearchList(searchRes.data);
              }}
            >
              <input placeholder="DITMEHOGMINH" className="nav-input"></input>
            </form>
            <div className="search-result-container">
              {searchList.map((el, index) => {
                return <SearchEl el={el} />;
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
