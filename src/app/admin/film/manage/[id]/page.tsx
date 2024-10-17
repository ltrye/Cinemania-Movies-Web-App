import { getFilmById } from "@/api/GetFilm";

export default async function Page({ params }) {
  const { id } = params;
  const film = (await getFilmById(id)).data;
  return (
    <>
      <h1 className="text-white">Manage Films</h1>
      <div className="text-white">{film.name}</div>
    </>
  );
}
