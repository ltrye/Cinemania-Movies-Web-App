"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useContext } from "react";
import slugify from "slugify";
//ICON/////
import { FaPlay } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

import getUserInfo from "@/api/checkLogin";
import { UserContext } from "@/context/UserContext";
import { easeInOutCubic } from "@/utils/Easing";

interface ScrollPosition {
  x: number;
  y: number;
  left?: number;
  right?: number;
}

let pos: ScrollPosition = { x: 0, y: 0 };
let dragging = false;

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

function useSlideShow() {
  const [select, setSelect] = useState(0);
  const [autoSlider, setAutoSlider] = useState(true);
  const slider = useRef<HTMLDivElement>();
  const sliderContainer = useRef<HTMLDivElement>();

  //Go through the last poster when first mount
  useEffect(() => {
    smoothScrollTo(
      slider.current,
      slider.current.scrollWidth - slider.current.clientWidth,
      1500
    );
    setSelect(4);
  }, []);

  useEffect(() => {
    if (autoSlider) {
      let currentSelect = select;
      const autoSlide = setInterval(() => {
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

  return {
    select,
    setSelect,
    autoSlider,
    setAutoSlider,
    slider,
    sliderContainer,
  };
}

export default function SpotlightSection({ filmList }) {
  const [select, setSelect] = useState(0);
  const { user, loading } = useContext(UserContext);

  return (
    <>
      <section className="spotlight-wrapper">
        {/* ----------HOME-INTRO------------- */}

        <UserSection user={user} loading={loading} />

        {/*---------IMAGE SLIDER--------- */}
        <section className="home-title">
          Phim nổi bật
          <div className="style-underline"></div>
        </section>

        <PreviewDescription
          title={filmList[select].name}
          date={filmList[select].year}
          genres={filmList[select].genres}
        />

        <div className="main-preview">
          <section
            style={{ transform: `translateX(${-20 * select}%)` }}
            className="image-slider"
          >
            {filmList.map((film, index) => (
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
        <SliderWrapper>
          {filmList.map((film, index) => (
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
        </SliderWrapper>
      </section>
      <div className="home-premium">
        <div>
          Xem phim không quảng cáo với premium
          <MdWorkspacePremium style={{ width: "1.5rem", height: "1.5rem" }} />
        </div>
        <Link href="/premium">Tìm hiểu</Link>
      </div>
    </>
  );
}

function UserSection({ user, loading }) {
  return (
    <>
      <section className="useFont home-intro">
        {loading &&
          (!user ? (
            // DISPLAY LOGIN SECTION IF NOT LOGGED IN

            <div className="home-login-section">
              <div>Đăng nhập để lưu phim, bình luận,..</div>
              <Link href="/user/login">Đăng nhập</Link>
            </div>
          ) : (
            //DISPLAY WELCOME SECTION AND LINK TO LIST IF LOGGED IN

            <>
              <div className="home-welcome">
                <div className="home-ava">
                  <Image alt="User avata" fill src="/demo-image.jpg" />
                </div>
                <div>
                  Chào bạn,
                  <span className="username"> {user.username}</span>
                </div>
              </div>
              <Link href="/profile/save" className="home-toList">
                Phim đã lưu <BsArrowUpRightSquareFill />
              </Link>
            </>
          ))}
      </section>
    </>
  );
}
function PreviewDescription({ title, date, genres }) {
  const year = new Date(date).getFullYear();

  return (
    <section className="home-preview-description">
      <button className="home-play-button">
        <Link
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0%",
            left: "0%",
          }}
          href={`/title/${slugify(title, { lower: true })}`}
        ></Link>
        <FaPlay
          style={{
            width: "1.5rem",
            height: "1.5rem",
            color: "var(--green-pallete)",
          }}
        />
      </button>
      <h1 className="home-main-title">
        {title}
        <div className="preview-date">
          {year} |{" "}
          <span style={{ color: "#44C1D3", opacity: "0.9" }}>Romance</span>
        </div>
      </h1>
    </section>
  );
}

function SliderWrapper({ children }) {
  const {
    select,
    setSelect,
    autoSlider,
    setAutoSlider,
    slider,
    sliderContainer,
  } = useSlideShow();

  const mouseMoveHandler = function (e) {
    // if (!dragging) return;
    sliderContainer.current.style.pointerEvents = "none";
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element

    slider.current.scrollLeft = pos.left - dx;
  };
  const mouseDownHandler = function (e) {
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
  return (
    <div
      ref={slider}
      onMouseDown={(e) => mouseDownHandler(e)}
      onMouseLeave={() => !autoSlider && setAutoSlider(true)}
      onMouseEnter={() => setAutoSlider(false)}
      onTouchStart={() => setAutoSlider(false)}
      className={"main-poster"}
    >
      <section
        tabIndex={1}
        ref={sliderContainer}
        style={{}}
        className="poster-slider"
      >
        {children}
      </section>

      {/** ---------------------*/}
    </div>
  );
}
