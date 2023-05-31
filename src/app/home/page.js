import "./style/page.scss";
import Image from "next/image";
//COMPONENTS/////////////

import FilmSection from "../global-components/FilmSection";
import SpotlightSection from "./components/SpotlightSection";
import Premium from "./components/Premium";
import checkLoggin from "../global-utils/checkLoggin";

export default async function Page() {
  // const userData = await checkLoggin();
  return (
    <>
      <SpotlightSection />
      <Premium />
      <FilmSection />
      <FilmSection />
      <FilmSection />
    </>
  );
}
