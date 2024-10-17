import { getFilmList } from "@/api/GetFilm";
import FilmPanel from "../../components/filmPanel";

export default async function Page({ params }) {
  const { pageNumber } = params;
  const filmData = await getFilmList(`page=${pageNumber}&limit=15`);
  return (
    <>
      <FilmPanel filmList={filmData.data} pageNumber={pageNumber} />
    </>
  );
}
