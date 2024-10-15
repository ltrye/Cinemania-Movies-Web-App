import "./style/page.scss";
import Image from "next/image";
import { BsChevronDoubleDown } from "react-icons/bs";

//COMPONENTS/////////////

import FilmSection from "../global-components/FilmSection";
import SpotlightSection from "./components/SpotlightSection";
import Premium from "./components/Premium";
import getUserInfo from "../../api/checkLogin";
import SwipeableSlider from "../global-components/slider";
import MySwiper from "../global-components/slider";
import {getFilmList} from "../../api/GetFilm";

export default async function Page() {
  const filmFetchList = await getFilmList();

  return (
    <>
      <SpotlightSection filmList={filmFetchList.data} />
      <FilmSection filmList={filmFetchList.data} />
      <FilmSection filmList={filmFetchList.data} />
      <FilmSection filmList={filmFetchList.data} />
    </>
  );
}

