"use client";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import slugify from "slugify";

let pos = { x: 0, y: 0 };
let dragging = false;

const mouseMoveHandler = function (e, slider) {
  if (!dragging) return;
  slider.current.style.pointerEvents = "none";
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;

  // Scroll the element

  e.currentTarget.scrollLeft = pos.left - dx;
};
const mouseDownHandler = function (e, slider) {
  dragging = true;
  pos = {
    // The current scroll
    left: e.currentTarget.scrollLeft,

    // Get the current mouse position
    x: e.clientX,
    y: e.clientY,
  };
  console.log(pos);
};
const mouseUpHandler = function (e, slider) {
  dragging = false;
  slider.current.style.pointerEvents = "auto";
};
///---------////////////////////////////////////
export default function FilmSection({ filmList }) {
  console.log(filmList);
  const slider = useRef();
  const [group, inView] = useInView({
    // triggerOnce: true,
    threshold: 0,
  });

  return (
    <section className="home-film-section">
      {/* <div
        ref={group}
        className={`film-group-name ${inView ? "animate" : ""}`}
      /> */}
      <div className="film-section-title">Trending</div>
      <div
        className="film-group"
        onMouseDown={(e) => mouseDownHandler(e, slider)}
        onMouseMove={(e) => mouseMoveHandler(e, slider)}
        onMouseUp={(e) => mouseUpHandler(e, slider)}
        onMouseLeave={() => (dragging = false)}
      >
        <div ref={slider} style={{ userSelect: "none" }} className="slider">
          {filmList.slice(0, 12).map((el, index) => (
            <Link
              key={index}
              className="film-holder"
              href={`/title/${slugify(el.name, {
                lower: true,
              })}`}
            >
              <Image
                alt="film"
                className="film"
                src={`https://picsum.photos/400/800?random=${index}`}
                width={200 * 0.85}
                height={300 * 0.85}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
