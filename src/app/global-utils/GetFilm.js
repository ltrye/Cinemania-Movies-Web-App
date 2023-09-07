export default async function getFilmList(params = null) {
  const movieList = await fetch(
    `https://https://movieflix-ljqx.onrender.com/api/v1/film${
      params !== null ? "?" + params : " "
    }`,
    { next: { revalidate: 5 } }
  );
  return movieList.json();
}
