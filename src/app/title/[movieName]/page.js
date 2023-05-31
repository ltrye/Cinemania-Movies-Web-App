import Image from "next/image";
import "./style/page.scss";

import { FaPlay } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";

import Link from "next/link";

export default async function Page({ params }) {
  const data = await getMovie();
  const movieData = data.data[0];
  const date = new Date(movieData.date).getFullYear();
  return (
    <>
      {/* <span style={{ fontSize: "1.5rem" }}>title/{params.movieName}</span> */}
      <div className="style-box"></div>
      <section className="description-grid-container">
        <div className="left-panel">
          <Image
            className="title-preview-image"
            alt="movie description"
            fill
            src="/giphy.gif"
          />
        </div>
        <div className="right-panel">
          <div className="top-panel">
            <h1 className="title">{movieData.name}</h1>
            <span className="title-date">
              {date} | {movieData.filmType}
            </span>

            <div className="description">{movieData.description}</div>
            <div className="preview-tag-wrapper">
              {movieData.genres.map((el) => (
                <div key={el} className="preview-tag">
                  {el}
                </div>
              ))}
            </div>
          </div>
          <div className="title-button">
            <Link href={`/play/${params.movieName}`}>
              <button className="title-play-button">
                <FaPlay />
                Watch now
              </button>
            </Link>
            <button className="bookmark-button">
              <BsBookmark style={{ height: "1.5rem", width: "1.5rem" }} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

async function getMovie() {
  //--Revalidate in production mode//
  const res = await fetch(
    "https://movieflix-production.up.railway.app/api/v1/film",
    { next: { revalidate: 10 } }
  );
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return res.json();
}
