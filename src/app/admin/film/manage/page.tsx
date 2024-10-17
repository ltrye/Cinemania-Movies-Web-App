"use client";

import { getFilmList, getFilmListByPage } from "@/api/GetFilm";
import { useRequestParams } from "@/hook/useRequestParams";
import { getRandomImageLink } from "@/utils/Utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const pageSize = 10;

export default function Page() {
  const params = useSearchParams();

  const page: number = parseInt(params.get("page")) || 1;
  const [filmList, setFilmList] = useState<[] | null>();

  useEffect(() => {
    async function getFilm() {
      // fetch data
      const film = await getFilmListByPage(page, pageSize);
      setFilmList(film.data);
    }
    getFilm();
  }, [page]);

  return (
    <div>
      <h1>Manage Films</h1>
      <div className="flex flex-wrap flex-row justify-center items-center gap-10">
        {filmList?.map((film, index) => {
          return (
            <FilmElement
              key={index}
              film={film}
              image={getRandomImageLink(400, 200)}
            />
          );
        })}
      </div>
    </div>
  );
}

function FilmElement({ film, image }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className="relative min-w-44 h-72 w-44"
      href={`/admin/film/manage/${film._id}`}
    >
      <Image
        alt="film"
        className=" rounded-md w-full h-full "
        src={image}
        width={200}
        height={220}
      />
      {hover && (
        <div className="absolute pl-2 pt-2 bottom-0 pointer-events-none left-0 right-0 h-16 bg-black bg-opacity-65 text-white">
          <div className="film-title">{film.name}</div>
        </div>
      )}
    </Link>
  );
}
