import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import requestSearch from "../../api/requestSearch";
import Image from "next/image";
import Link from "next/link";
import "./style/SearchBox.scss";
import slugify from "slugify";

function SearchEl(el) {
  const year = new Date(el.el.year).getFullYear();
  return (
    <>
      <Link
        href={`/title/${slugify(el.el.name, { lower: true })}`}
        className="search-element"
      >
        <div className="search-image">
          <Image
            alt="search image"
            fill
            src={`https://picsum.photos/400/800?random=${1}`}
          />
        </div>
        <span className="search-description">
          {el.el.name}
          <br />
          <span className="useFont" style={{ color: "#01c38d" }}>
            {year}
          </span>
        </span>
      </Link>
    </>
  );
}

export default function SearchBox({}) {
  const [searchList, setSearchList] = useState([]);

  const searchBox = useRef<HTMLDivElement>();
  const searchInput = useRef<HTMLInputElement>();
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
    if (searchOption.mount && searchOption.style === "fade out") {
      setSearchOption({ style: null, mount: false });
      setSearchList([]);
    }
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
            onTransitionEnd={transitionEndHandler}
            className={`search-box ${
              searchOption.style === "fade out" && "search-close "
            }`}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!searchInput.current.value) return;
                const searchRes = await requestSearch(searchInput.current);
                if (searchRes.result === 0) return setSearchList(null);
                setSearchList(searchRes.data);
              }}
            >
              <div className="search-input-container">
                <div
                  onClick={async () => {
                    if (!searchInput.current.value) return;
                    const searchRes = await requestSearch(searchInput.current);
                    if (!searchRes.data) return setSearchList(null);
                    else setSearchList(searchRes.data);
                  }}
                >
                  <AiOutlineSearch />
                </div>
                <input ref={searchInput} placeholder="Tìm kiếm phim"></input>
              </div>
            </form>

            <div className="search-result-container">
              {!searchList && (
                <div style={{ color: "white", marginLeft: "1rem" }}>
                  Khong co ket qua
                </div>
              )}
              {searchList &&
                searchList.map((el, index) => {
                  return <SearchEl key={index} el={el} />;
                })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
