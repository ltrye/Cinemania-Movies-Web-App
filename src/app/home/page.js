import "./style/page.scss";
import Image from "next/image";
import { BsChevronDoubleDown } from "react-icons/bs";
//COMPONENTS/////////////

import FilmSection from "../global-components/FilmSection";
import SpotlightSection from "./components/SpotlightSection";
import Premium from "./components/Premium";
import checkLogin from "../global-utils/checkLogin";
import SwipeableSlider from "../global-components/slider";
import MySwiper from "../global-components/slider";

export default async function Page() {
  const filmList = await getFilmList();

  return (
    <>
      <SpotlightSection filmList={filmList.data} />
      <div className="home-explore">
        <span className="explore">Explore</span>
        <BsChevronDoubleDown className="arrow-down-icon" />
      </div>
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
