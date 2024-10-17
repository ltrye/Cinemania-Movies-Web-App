"use client";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { getRandomImageLink } from "@/utils/Utils";
import useEmblaCarousel from "embla-carousel-react";

///---------////////////////////////////////////
export default function FilmSection({ filmList }) {
  const [emblaRef] = useEmblaCarousel();

  return (
    <section className="home-film-section">
      <div className="film-section-title">Trending</div>
      <div ref={emblaRef} className=" h-80">
        <div className="relative flex flex-row p-4 gap-x-4">
          {filmList.map((el, index) => (
            <FilmElement
              key={index}
              film={el}
              image={getRandomImageLink(400, 800)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilmElement({ film, image }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className="relative min-w-44 h-72"
      href={`/title/${film.slug}`}
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
