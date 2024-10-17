import { getFilmList } from "@/api/GetFilm";
import FilmSection from "../global-components/FilmSection";

import FilmPanel from "./components/filmPanel";
// import TrendSlider from "./components/trendSlider";
import "./style/page.scss";

export default async function Layout({ children }) {

  return (
    <div>
      {/* <FilmSection /> */}
      {/* <TrendSlider /> */}
      {/* <FilmPanel filmList={filmData.data} /> */}
      {children}
    </div>
  );
}
