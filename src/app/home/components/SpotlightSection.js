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

let pos = { x: 0, y: 0 };
let dragging = true;

function smoothScrollTo(element, to, duration) {
  const start = element.scrollLeft;
  const change = to - start;
  const startTime = performance.now();

  function scroll(timestamp) {
    const currentTime = timestamp - startTime;
    const scrollValue = easeInOutCubic(currentTime, start, change, duration);
    element.scrollLeft = scrollValue;

    if (currentTime < duration) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

// Easing function for smooth scroll
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}
function PreviewDescription({ title, date, genres }) {
  const year = new Date(date).getFullYear();

  return (
    <>
      <h1 className="home-main-title">
        {/* <div className="home-feature-title">
          <div className="style-block" />
          <span style={{ color: "#44C1D3" }}>
            Cinemania <span style={{ color: "white" }}>recommend</span>
          </span>{" "}
        </div> */}
        Lorem ipsum dolor sit amet
        {/* <div className="home-line"></div> */}
        <hr style={{ marginTop: "1.2rem" }} />
        <div className="preview-date">
          {year} |{" "}
          <span style={{ color: "#44C1D3", opacity: "0.9" }}>Romance</span>
        </div>
        <div className="useFont home-description">
          In a post-apocalyptic world, a group of survivors embarks on a daring
          mission to find a mythical paradise believed to hold the key to
          humanity's salvation.
        </div>
      </h1>
      {/* <section className="description-wrapper">
        <div className="preview-tag-wrapper">
          {genres.map((el) => (
            <div key={el} className="preview-tag">
              {el}
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
}

export default function SpotlightSection({ filmList }) {
  const userName = useRef();
  const [select, setSelect] = useState(0);
  const [welcomeText, setWelcomeText] = useState(null);
  const [autoSlider, setAutoSlider] = useState(true);
  const slider = useRef();
  const sliderContainer = useRef();
  //--CHECK IF CLIENT IS LOGGED IN, SET WELCOME TEXT--//
  useEffect(() => {
    async function checkUser() {
      const user = await checkLogin();

      if (user.status === "fail") setWelcomeText("none");
      else setWelcomeText(user.data.name);
    }
    checkUser();
  }, []);
  ///SCROLLER//
  const mouseMoveHandler = function (e) {
    // if (!dragging) return;
    sliderContainer.current.style.pointerEvents = "none";
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element

    slider.current.scrollLeft = pos.left - dx;
  };
  const mouseDownHandler = function (e, slider, sliderContainer) {
    dragging = true;
    pos = {
      // The current scroll
      left: e.currentTarget.scrollLeft,

      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  const mouseUpHandler = function (e) {
    document.removeEventListener("mouseup", mouseUpHandler);
    document.removeEventListener("mousemove", mouseMoveHandler);
    sliderContainer.current.style.pointerEvents = "auto";
  };

  //Go through the last poster when first mount
  useEffect(() => {
    smoothScrollTo(
      slider.current,
      slider.current.scrollWidth - slider.current.clientWidth,
      1500
    );
    setSelect(4);
  }, []);
  //--Change the slide show every 3 second
  useEffect(() => {
    console.log(autoSlider);
    if (autoSlider) {
      let currentSelect = select;
      const autoSlide = setInterval(() => {
        console.log(currentSelect);
        if (currentSelect === 5) {
          setSelect(0);
          currentSelect = 0;
        } else {
          setSelect(currentSelect);
          currentSelect++;
        }
        if (currentSelect > 3)
          smoothScrollTo(
            slider.current,
            slider.current.scrollWidth - slider.current.clientWidth,
            1500
          );
        else smoothScrollTo(slider.current, 0, 1500);
      }, 2500);
      return () => clearInterval(autoSlide);
    }
  }, [autoSlider]);
  return (
    <>
      {/* <JsCheck /> */}
      <section className="useFont home-intro">
        {welcomeText &&
          (welcomeText !== "none" ? (
            <span
              ref={userName}
              className="welcome-text"
              style={{ fontSize: "1.1rem", color: "white" }}
            >
              Welcome back,{" "}
              <strong style={{ fontSize: "1.3rem", color: "#01c38d" }}>
                {welcomeText}
              </strong>
              🌳
            </span>
          ) : (
            <span
              ref={userName}
              className="welcome-text"
              style={{
                fontSize: "1.3rem",
                color: "#01c38d",
                cursor: "pointer",
              }}
            >
              <ins onClick={() => (window.location.href = "/user/login")}>
                Login
              </ins>{" "}
              or{" "}
              <ins onClick={() => (window.location.href = "/user/signup")}>
                Sign up
              </ins>
            </span>
          ))}
      </section>

      <section className="spotlight-wrapper">
        {/*---------IMAGE SLIDER--------- */}
        <div className="preview-button">
          <Link
            className="home-play-button"
            href={`/title/${filmList[select].id}`}
          >
            <FaPlay className="home-play-icon" />
            {/* Watch */}
          </Link>
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
            {filmList.slice(0, 5).map((film, index) => (
              <div key={index} className="film-preview">
                <Image
                  priority
                  alt="preview"
                  fill
                  src={
                    "https://res.cloudinary.com/dfspqu7kx/image/upload/v1686152845/Film%20Preview/2017-dunkirk_qmz9nj.webp"
                  }
                />
              </div>
            ))}

            <div className="loading-state"></div>
          </section>
          {/**------------------------------ */}
        </div>
        {/*Right Panel */}
        {/*----------POSTER SLIDER--------- */}
        <div
          ref={slider}
          onMouseDown={(e) => mouseDownHandler(e, slider, sliderContainer)}
          onMouseLeave={() => !autoSlider && setAutoSlider(true)}
          onMouseEnter={() => setAutoSlider(false)}
          onTouchStart={() => setAutoSlider(false)}
          className="main-poster"
        >
          <section
            tabIndex={1}
            ref={sliderContainer}
            style={{}}
            className="poster-slider"
          >
            {[...Array(5)].map((film, index) => (
              <div
                onClick={() => {
                  setSelect(index);
                }}
                key={index}
                className={`poster-element ${select === index && "active"}`}
              >
                <div className={`poster-image ${select === index && "active"}`}>
                  <Image
                    priority
                    alt="preview"
                    fill
                    src={`https://picsum.photos/400/800?random=${index}`}
                  />
                </div>
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
