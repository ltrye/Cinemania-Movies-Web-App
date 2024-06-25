export default async function getFilmList(params = null) {
  const movieList = await fetch(
    `${process.env.BACKEND}film${
      params !== null ? "?" + params : " "
    }`,
    { next: { revalidate: 5 } }
  );
  return movieList.json();
}
