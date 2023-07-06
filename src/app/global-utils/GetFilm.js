export default async function getFilmList(params = null) {
  const movieList = await fetch(
    `https://movieflix-production.up.railway.app/api/v1/film${
      params !== null ? "?" + params : " "
    }`,
    { next: { revalidate: 5 } }
  );
  return movieList.json();
}
