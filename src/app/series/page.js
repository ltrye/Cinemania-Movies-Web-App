import FilmSection from "../global-components/FilmSection";
import FilmPanel from "./components/filmPanel";
import TrendSlider from "./components/trendSlider";
import "./style/page.scss";

export default function Series() {
  return (
    <div>
      {/* <FilmSection /> */}
      <TrendSlider />
      <FilmPanel />
    </div>
  );
}
