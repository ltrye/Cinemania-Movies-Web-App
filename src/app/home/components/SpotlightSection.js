"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
//ICON/////
import { FaPlay } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import JsCheck from "@/app/global-components/JsCheck";
import checkLoggin from "@/app/global-utils/checkLogin";

export default function SpotlightSection() {
  const [select, setSelect] = useState(0);

  return (
    <>
      {/* <JsCheck /> */}
      <section className="spotlight-wrapper">
        <section className="home-promotion"></section>
        <section className="home-user">
          <div className="home-user-ava">
            <Image fill src="/ava-demo.jpg" />
          </div>
        </section>
        {/*----------SELECT PANEL---------*/}
        <div className="select-panel">
          <div className="poster-select">
            {[...Array(5)].map((el, index) => (
              <div
                onClick={() => setSelect(index)}
                key={index}
                className={`circle ${index === select ? "black" : ""}`}
              ></div>
            ))}
          </div>
        </div>
        {/**--------------------------- */}
        {/*Left Panel */}
        <div className="main-preview">
          <div className="title-left"></div>
          <div className="preview-holder">
            {/*---------IMAGE SLIDER--------- */}
            <div className="preview-info">
              <PreviewDescription
                title={hightlightMovie[select].title}
                date={hightlightMovie[select].date}
                genre={hightlightMovie[select].genre}
              />
              <div className="preview-button">
                <Link
                  className="button-link"
                  href={`/title/${hightlightMovie[select].title}`}
                >
                  <div className="play-button">
                    <FaPlay className="home-play-icon" />
                    Watch
                  </div>
                </Link>

                <div className="bookmark-holder">
                  <BsBookmark className="bookmark-button" />
                </div>
              </div>
            </div>

            <section
              style={{ transform: `translateY(${-20 * select}%)` }}
              className="image-slider"
            >
              {hightlightMovie.map((film, index) => (
                <div key={index} className="film-preview">
                  <Image priority alt="preview" fill src={film.url} />
                </div>
              ))}

              <div className="loading-state"></div>
            </section>
            {/**------------------------------ */}
          </div>
        </div>
        {/*Right Panel */}
        <div className="main-poster">
          {/*----------POSTER SLIDER--------- */}
          <div className="poster-holder">
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
          </div>
          {/** ---------------------*/}
        </div>
      </section>
    </>
  );
}

const hightlightMovie = [
  {
    url: "/demo-image.jpg",
    title: "Trye1",
    date: "2022",
    genre: ["anime", "fantasy", "adventure"],
  },
  {
    url: "/demo2.jpg",
    title: "Trye2",
    date: "20232",
    genre: ["sci-fi", "horror", "adventure"],
  },
  {
    url: "/demo-image.jpg",
    title: "Trye3",
    date: "20212",
    genre: ["adasda", "fantasdsy", "adventure"],
  },
  {
    url: "/demo2.jpg",
    title: "Trye4",
    date: "202e2",
    genre: ["anime", "fgdg", "adventure"],
  },
  {
    url: "/demo-image.jpg",
    title: "Trye5",
    date: "20232",
    genre: ["andsfime", "fantdasy", "adventure"],
  },
];

function PreviewDescription({ title, date, genre }) {
  console.log(genre);
  return (
    <section className="description-wrapper">
      <h1 className="main-title">{title}</h1>
      <span className="preview-date">${date} | IMDb 8.2</span>
      <div className="preview-tag-wrapper">
        {genre.map((el) => (
          <div key={el} className="preview-tag">
            {el}
          </div>
        ))}
      </div>
    </section>
  );
}
