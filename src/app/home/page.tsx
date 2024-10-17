import "./style/page.scss";

//COMPONENTS/////////////

import FilmSection from "../global-components/FilmSection";
import SpotlightSection from "./components/SpotlightSection";
import {
  getFilmList,
  getSpotlightFilm,
  getTrendingFilm,
} from "../../api/GetFilm";

export default async function Page() {
  const filmFetchList = await getTrendingFilm();
  const spotlightFilm = await getSpotlightFilm();

  return (
    <>
      <SpotlightSection filmList={spotlightFilm.data} />
      <FilmSection filmList={filmFetchList.data} />
      <FilmSection filmList={filmFetchList.data} />
      <FilmSection filmList={filmFetchList.data} />
    </>
  );
}
