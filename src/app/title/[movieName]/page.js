import Image from "next/image";
import "./style/page.scss";

import { FaPlay } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";

import Link from "next/link";
import saveTolist, { SaveButton } from "@/app/global-utils/saveToList";

export default async function Page({ params }) {
  const movieData = await getMovie(params.movieName);
  const { data } = movieData;
  const date = new Date(data.date).getFullYear();

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
            <h1 className="title">{data.name}</h1>
            <span className="title-date">
              {date} | {data.filmType}
            </span>

            <div className="description">{data.description}</div>
            <div className="preview-tag-wrapper">
              {data.genres.map((el) => (
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
            <SaveButton id={params.movieName} />
          </div>
        </div>
      </section>
    </>
  );
}

async function getMovie(id) {
  //--Revalidate in production mode//
  const res = await fetch(
    `https://movieflix-production.up.railway.app/api/v1/film/${id}`,
    { next: { revalidate: 10 } }
  );
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return res.json();
}
