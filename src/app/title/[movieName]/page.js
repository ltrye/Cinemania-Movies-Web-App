import Image from "next/image";
import "./style/page.scss";

import { FaPlay } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";

import Link from "next/link";
import saveTolist, { SaveButton } from "@/app/global-utils/saveToList";
import CommentSection from "./components/Comment";

export default async function Page({ params }) {
  const movieData = await getMovie(params.movieName);
  const { data } = movieData;
  const date = new Date(data.date).getFullYear();

  return (
    <>
      <section className="description-grid-container">
        <div className="left-panel">
          <Image
            className="title-preview-image"
            alt="movie description"
            fill
            src="/title-test.jpg"
          />
        </div>

        <div className="right-panel">
          <div className="top-panel">
            <h1 className="title">{data.name}</h1>
            <span className="title-date">
              {date} | {data.filmType}
            </span>

            <div className="description">{data.description}</div>
            <div className="preview-tag-wrapper"></div>
          </div>
          <div className="title-button">
            <Link
              style={{ width: "50%", height: "5rem", position: "relative" }}
              href={`/play/${params.movieName}`}
            >
              <button className="title-play-button">
                <FaPlay style={{ flexShrink: "0" }} />
                Watch now
              </button>
            </Link>
            <SaveButton id={params.movieName} />
          </div>
          <CommentSection />
        </div>
      </section>
    </>
  );
}

async function getMovie(id) {
  //--Revalidate in production mode//
  const res = await fetch(
    `https://movieflix-ljqx.onrender.com/api/v1/film/${id}`,
    { next: { revalidate: 10 } }
  );
  if (!res.ok) {
    throw new Error("Fail to fetch data");
  }
  return res.json();
}
