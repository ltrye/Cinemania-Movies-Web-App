import Image from "next/image";
import "./style/page.scss";

import { FaPlay } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";

import Link from "next/link";
import { saveTolist } from "@/api/saveToList";
import CommentSection from "./components/Comment";
import { getFilmById } from "@/api/GetFilm";
import { SaveButton } from "./components/SaveButton";

export default async function Page({ params }) {
  const { data } = await getFilmById(params.movieName);

  console.log(data);
  const date = new Date(data.year).getFullYear();

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
            <SaveButton id={data._id} />
          </div>
          <CommentSection />
        </div>
      </section>
    </>
  );
}
