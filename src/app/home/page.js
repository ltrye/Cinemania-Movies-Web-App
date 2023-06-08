import "./style/page.scss";
import Image from "next/image";
//COMPONENTS/////////////

import FilmSection from "../global-components/FilmSection";
import SpotlightSection from "./components/SpotlightSection";
import Premium from "./components/Premium";
import checkLogin from "../global-utils/checkLogin";

export default async function Page() {
  const filmList = await getFilmList();

  return (
    <>
      <SpotlightSection filmList={filmList.data} />
      <Premium />
      <FilmSection />
      <FilmSection />
      <FilmSection />
    </>
  );
}

async function getFilmList() {
  const movieList = await fetch(
    `https://movieflix-production.up.railway.app/api/v1/film`,
    { next: { revalidate: 5 } }
  );
  return movieList.json();
}
