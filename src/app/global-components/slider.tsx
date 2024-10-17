"use client";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

interface ScrollPosition {
  x: number;
  y: number;
  left?: number;
  right?: number;
}

let pos: ScrollPosition = { x: 0, y: 0 };
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
};
const mouseUpHandler = function (e, slider) {
  dragging = false;
  slider.current.style.pointerEvents = "auto";
};
///---------////////////////////////////////////
export default function Slider({ children }) {
  const slider = useRef();

  const [group, inView] = useInView({
    // triggerOnce: true,
    threshold: 0,
  });

  return (
    <section className="home-film-section">
      <div
        ref={group}
        className={`film-group-name ${inView ? "animate" : ""}`}
      />
      <div
        className="film-group"
        onMouseDown={(e) => mouseDownHandler(e, slider)}
        onMouseMove={(e) => mouseMoveHandler(e, slider)}
        onMouseUp={(e) => mouseUpHandler(e, slider)}
        onMouseLeave={() => (dragging = false)}
      >
        <div ref={slider} style={{ userSelect: "none" }} className="slider">
          {children}
        </div>
      </div>
    </section>
  );
}
