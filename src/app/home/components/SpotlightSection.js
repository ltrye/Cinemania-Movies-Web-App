"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
//ICON/////
import { FaPlay } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";

import { HiOutlinePlay } from "react-icons/hi2";
import JsCheck from "@/app/global-components/JsCheck";
import checkLogin from "@/app/global-utils/checkLogin";
import saveTolist from "@/app/global-utils/saveToList";

function PreviewDescription({ title, date, genres }) {
  const year = new Date(date).getFullYear();

  return (
    <>
      <h1 className="home-main-title">
        {title}

        <div className="home-line"></div>
      </h1>
      <section className="description-wrapper">
        <span className="preview-date">
          {year} |{" "}
          <span style={{ color: "yellow", opacity: "0.9" }}>IMDb 8.2</span>
        </span>
        <span className="useFont home-description">
          In a post-apocalyptic world, a group of survivors embarks on a daring
          mission to find a mythical paradise believed to hold the key to
          humanity's salvation.
        </span>
        <div className="preview-tag-wrapper">
          {genres.map((el) => (
            <div key={el} className="preview-tag">
              {el}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function SpotlightSection({ filmList }) {
  const userName = useRef();
  const [select, setSelect] = useState(0);
  useEffect(() => {
    async function checkUser() {
      const user = await checkLogin();
      console.log(user);

      if (user.status === "fail")
        return (userName.current.innerHTML = " NOT LOGIN");
      else return (userName.current.innerHTML = " " + user.data.name);
    }

    console.log(checkUser());
  });

  return (
    <>
      {/* <JsCheck /> */}
      <section className="useFont home-intro">
        Welcome back,
        <span
          ref={userName}
          style={{ fontSize: "1.3rem", color: "#01c38d" }}
        ></span>
        <span style={{ fontSize: "2rem" }}>🌳 </span>
      </section>
      <section className="spotlight-wrapper">
        <div className="home-next-icon">
          <HiOutlinePlay
            onClick={() => {
              if (select === 0) return setSelect(4);
              setSelect(select - 1);
            }}
            style={{
              width: "2rem",
              height: "2rem",
              transform: "rotate(180deg)",
            }}
          />
          <HiOutlinePlay
            onClick={() => {
              if (select === 4) return setSelect(0);
              setSelect(select + 1);
            }}
            style={{ width: "2rem", height: "2rem" }}
          />
        </div>
        <section className="home-promotion"></section>
        {/* <section className="home-user">
          <div className="home-user-ava">
            <Image fill src="/ava-demo.jpg" />
          </div>
        </section> */}
        {/*----------SELECT PANEL---------*/}
        <div className="select-panel">
          <div className="poster-select">
            {[...Array(5)].map((el, index) => (
              <div
                onClick={() => setSelect(index)}
                key={index}
                className={`circle ${index === select ? "green" : ""}`}
              ></div>
            ))}
          </div>
        </div>
        {/**--------------------------- */}
        {/*Left Panel */}
        {/*---------IMAGE SLIDER--------- */}
        <div className="preview-button">
          <Link
            className="home-play-button"
            href={`/title/${filmList[select].id}`}
          >
            <FaPlay className="home-play-icon" />
            Watch
          </Link>

          <div
            onClick={() => {
              saveTolist(filmList[select].id);
            }}
            className="bookmark-holder"
          >
            <BsBookmark className="bookmark-button" />
          </div>
        </div>

        <PreviewDescription
          title={filmList[select].name}
          date={filmList[select].date}
          genres={filmList[select].genres}
        />

        <div className="main-preview">
          <section
            style={{ transform: `translateY(${-20 * select}%)` }}
            className="image-slider"
          >
            {filmList.map((film, index) => (
              <div key={index} className="film-preview">
                <Image priority alt="preview" fill src={film.filmImage} />
              </div>
            ))}

            <div className="loading-state"></div>
          </section>
          {/**------------------------------ */}
        </div>
        {/*Right Panel */}
        <div className="main-poster">
          {/*----------POSTER SLIDER--------- */}

          <section
            style={{ transform: `translateY(${-20 * select}%)` }}
            className="poster-slider"
          >
            {hightlightMovie.map((film, index) => (
              <div key={index} className="poster-element">
                <Image
                  priority
                  alt="preview"
                  fill
                  src={`https://picsum.photos/400/800?random=${index}`}
                />
              </div>
            ))}
            <div className="loading-state"></div>
          </section>

          {/** ---------------------*/}
        </div>
      </section>
    </>
  );
}

const hightlightMovie = [
  {
    url: "/demo-image.jpg",
    title: "Life of Trye1",
    date: "2022",
    genre: ["anime", "fantasy", "adventure"],
  },
  {
    url: "/demo2.jpg",
    title: "Life of Trye2",
    date: "20232",
    genre: ["sci-fi", "horror", "adventure"],
  },
  {
    url: "/demo-image.jpg",
    title: "Life of Trye3",
    date: "20212",
    genre: ["adasda", "fantasdsy", "adventure"],
  },
  {
    url: "/demo2.jpg",
    title: "Life of Trye4",
    date: "202e2",
    genre: ["anime", "fgdg", "adventure"],
  },
  {
    url: "/demo-image.jpg",
    title: "Life of Trye5",
    date: "20232",
    genre: ["andsfime", "fantdasy", "adventure"],
  },
];
